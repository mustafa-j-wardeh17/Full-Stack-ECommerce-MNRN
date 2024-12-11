import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { checkoutDtoArr } from './dto/checkout.dto';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { OrdersRepository } from 'src/shared/repositories/order.repository';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import config from 'config'
import { userTypes } from 'src/shared/schema/users';
import { Orders, orderStatus, paymentStatus } from 'src/shared/schema/order';
import { sendEmail } from 'src/utility/mail-handler';


@Injectable()
export class OrdersService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    @Inject(OrdersRepository) private readonly orderDB: OrdersRepository,
    @Inject(ProductRepository) private readonly productDB: ProductRepository,
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) { }

  /**
   * Creates a checkout session for payment using Stripe.
   * Validates stock availability and prepares line items for the session.
   */
  async checkout(body: checkoutDtoArr, user: Record<string, any>): Promise<{
    message: string,
    success: boolean,
    result: string
  }> {
    try {
      const lineItems = [];
      const cartItems = body.checkoutDetails;
      for (const item of cartItems) {
        const itemsAreInStock = await this.productDB.findLicenses({
          productSku: item.skuId,
          isSold: false,
        });
        if (itemsAreInStock.length <= item.quantity) {
          lineItems.push({
            price: item.skuPriceId,
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              maximum: 5,
              minimum: 1,
            },
          });
        }
      }

      if (lineItems.length === 0) {
        throw new BadRequestException(
          'These products are not available right now',
        );
      }

      const session = await this.stripeClient.checkout.sessions.create({
        line_items: lineItems,
        metadata: {
          userId: user._id.toString(),
        },
        mode: 'payment',
        billing_address_collection: 'required',
        phone_number_collection: {
          enabled: true,
        },
        customer_email: user.email,
        success_url: config.get('stripe.successUrl'),
        cancel_url: config.get('stripe.cancelUrl'),
      });

      return {
        message: 'Payment checkout session successfully created',
        success: true,
        result: session.url,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches all orders based on status and user type.
   */
  async findAll(status: string, user: Record<string, any>): Promise<{
    message: string,
    success: boolean,
    result: {
      orders: Orders[]
    }
  }> {
    try {
      const userDetails = await this.userDB.findOne({
        _id: user._id.toString()
      });

      const query = {} as Record<string, any>;

      if (userDetails.type === userTypes.CUSTOMER) {
        query.userId = user._id.toString();
      }

      if (status) {
        query.status = status;
      }
      const orders = await this.orderDB.find(query);
      return {
        message: "Order fetched successfully",
        success: true,
        result: {
          orders: orders
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches details of a single order by its ID.
   */
  async findOne(id: string): Promise<{
    message: string,
    success: boolean,
    result: {
      order: Orders
    }
  }> {
    try {
      const result = await this.orderDB.findOne({ _id: id });
      return {
        success: true,
        message: `Order with id = ${id} has been fetched successfully`,
        result: {
          order: result
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Handles Stripe webhook events, particularly checkout session completion.
   * Processes orders and fulfills them accordingly.
   */
  async webhook(rawBody: Buffer, sig: string) {
    try {
      let event;
      try {
        event = this.stripeClient.webhooks.constructEventAsync(
          rawBody,
          sig,
          config.get('stripe.webhookSecret')
        );

      } catch (error: any) {
        throw new BadRequestException('Webhook Error:', error.message);
      }

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderData = await this.createOrderObject(session);
        const order = await this.create(orderData);

        if (session.payment_status === paymentStatus.paid) {
          if (order.orderStatus !== orderStatus.completed) {
            for (const item of order.orderedItems) {
              const licenses = await this.getLicense(orderData.orderId, item);
              item.licenses = licenses;
            }

          }
          await this.fullfillOrder(
            session.id,
            {
              orderStatus: orderStatus.completed,
              isOrderDelivered: true,
              ...orderData,
            }
          );
          this.sendOrderEmail(
            orderData.customerEmail,
            orderData.orderId,
            `${config.get('emailService.emailTemplates.orderSuccess')}${order._id}`,
          );

        }
      } else {
        throw new Error('Unhandled event type');
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates an order object from a Stripe checkout session.
   */
  async createOrderObject(session: Stripe.Checkout.Session) {
    try {
      const lineItems = await this.stripeClient.checkout.sessions.listLineItems(
        session.id,
      );
      const orderData = {
        orderId: Math.floor(new Date().valueOf() * Math.random()) + '',
        userId: session.metadata?.userId?.toString(),
        customerAddress: session.customer_details?.address,
        customerEmail: session.customer_email,
        customerPhoneNumber: session.customer_details?.phone,
        paymentInfo: {
          paymentMethod: session.payment_method_types[0],
          paymentIntentId: session.payment_intent,
          paymentDate: new Date(),
          paymentAmount: session.amount_total / 100,
          paymentStatus: session.payment_status,
        },
        orderDate: new Date(),
        checkoutSessionId: session.id,
        orderedItems: lineItems.data.map((item) => {
          item.price.metadata.quantity = item.quantity + '';
          return item.price.metadata;
        }),
      };
      return orderData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new order in the database.
   */
  async create(createOrderDto: Record<string, any>) {
    try {
      const orderExists = await this.orderDB.findOne({
        checkoutSessionId: createOrderDto.checkoutSessionId,
      });
      if (orderExists) return orderExists;
      const result = await this.orderDB.create(createOrderDto);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves licenses for ordered items and marks them as sold.
   */
  async getLicense(orderId: string, item: Record<string, any>) {
    try {
      const product = await this.productDB.findById(item.productId);

      const skuDetails = product.skuDetails.find(
        (sku) => sku.skuCode === item.skuCode,
      );

      const licenses = await this.productDB.findLicenses(
        {
          productSku: skuDetails._id,
          isSold: false,
        },
        item.quantity,
      );

      const licenseIds = licenses.map((license) => license._id);

      await this.productDB.updateLicenseMany(
        {
          _id: {
            $in: licenseIds,
          },
        },
        {
          isSold: true,
          orderId,
        },
      );

      return licenses.map((license) => license.licenseKey);
    } catch (error) {
      throw error;
    }
  }

  async fullfillOrder(
    checkoutSessionId: string,
    updateOrderDto: Record<string, any>,
  ) {
    try {
      return await this.orderDB.findOneAndUpdate(
        { checkoutSessionId },
        updateOrderDto,
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }

  async sendOrderEmail(email: string, orderId: string, orderLink: string) {
    await sendEmail(
      email,
      config.get('emailService.emailTemplates.orderSuccess'),
      'Order Success - Digizone',
      {
        orderId,
        orderLink,
      },
    );
  }

}
