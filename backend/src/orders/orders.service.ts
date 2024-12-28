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
import { MailerService } from 'src/middleware/mailer';


@Injectable()
export class OrdersService {

  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    @Inject(OrdersRepository) private readonly orderDB: OrdersRepository,
    @Inject(ProductRepository) private readonly productDB: ProductRepository,
    @Inject(UserRepository) private readonly userDB: UserRepository,
    @Inject(MailerService) private readonly mailer: MailerService
  ) {

  }

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

      // Adding metadata with SKU and Product IDs
      const metadata = cartItems.reduce((acc, item, index) => {
        acc[`skuId_${index}`] = item.skuId;
        acc[`productId_${index}`] = item.productId;
        acc[`quantity_${index}`] = item.quantity;
        return acc;
      }, {});

      const session = await this.stripeClient.checkout.sessions.create({
        line_items: lineItems,
        metadata: {
          ...metadata,
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
        // Verify the webhook signature and construct the event
        event = this.stripeClient.webhooks.constructEvent(
          rawBody,
          sig,
          config.get('stripe.webhookSecret'),
        );
      } catch (err) {
        // Log detailed error and throw custom BadRequestException
        throw new BadRequestException('Webhook Error: ' + err.message);
      }


      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract SKU and Product IDs from metadata
        const metadata = session.metadata;
        const skusAndProducts: {
          skuId: string,
          productId: string,
          quantity: number,
        }[] = Object.keys(metadata)
          .reduce((acc, key) => {
            const match = key.match(/(skuId|productId|quantity)_(\d+)/);
            if (match) {
              const [, field, index] = match;
              acc[index] = acc[index] || {};
              acc[index][field] = metadata[key];
            }
            return acc;
          }, [])
          .filter(item => item.skuId && item.productId && item.quantity); // Ensure only complete entries are included


        console.log('SKUs and Products and Quantity from Metadata:', skusAndProducts);

        const orderData = await this.createOrderObject(session);
        const order = await this.create(orderData);

        // Check if payment is successful
        if (session.payment_status === paymentStatus.paid) {
          let licenses: { licenseKey: string; skuName: string; productName: string }[] = [];

          for (const product of skusAndProducts) {
            const findProduct = await this.productDB.findById(product.productId);

            // Update remaining stock for the SKU
            await this.productDB.decrementSkuRemainingStock(product.productId, product.skuId, product.quantity);

            if (findProduct.hasLicenses) {
              // Retrieve and mark licenses as sold
              const retrievedLicenses = await this.getLicenseAndSetItSold(
                order.orderId,
                product.skuId,
                product.productId,
                product.quantity
              );

              licenses.push(
                ...retrievedLicenses.map(license => ({
                  licenseKey: license.licenseKey,
                  skuName: license.productSku,
                  productName: findProduct.productName,
                }))
              );
            }
          }

          // Fulfill the order and update its status
          await this.fullfillOrder(session.id, {
            orderStatus: orderStatus.completed,
            isOrderDelivered: true,
            ...orderData,
          });

          const user = await this.userDB.findById(orderData.userId);

          // Send email with license details
          if (licenses.length > 0) {
            await this.sendLicenseEmail(user.email, user.name, licenses);
          }

          // Send order confirmation email
          this.sendOrderEmail(
            orderData.customerEmail,
            user.name,
            orderData.orderId,
            `${config.get('frontendbase')}my-account/my-orders/success`
          );
        }

        return {
          message: 'Payment checkout session successfully processed',
          success: true,
          result: null,
        };

      } else if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Handle further logic based on payment intent success if needed
        // (e.g., mark the order as paid, notify the customer, etc.)
        // Example:
        if (paymentIntent.status === 'succeeded') {
          // You can add specific actions here like updating the order status
          console.log('Payment Intent succeeded. Proceeding with the next steps...');
        }
        return {
          message: "Payment checkout session successfully created",
          success: true,
          result: null
        }
      } else {
        throw new Error('Unhandled event type:');
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
  async getLicenseAndSetItSold(orderId: string, skuId: string, productId: string, quantity: number) {
    const licenses = await this.productDB.findLicenses(
      { productSku: skuId, isSold: false },
      quantity
    );

    const licenseIds = licenses.map(license => license._id);

    await this.productDB.updateLicenseMany(
      { _id: { $in: licenseIds } },
      { isSold: true, orderId }
    );

    return licenses;
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

  async sendOrderEmail(email: string, customerName: string, orderId: string, orderLink: string) {
    await this.mailer.sendMail({
      to: [{ name: customerName, address: email }], // Replace `customerName` with the appropriate variable if available
      subject: 'Order Success - PS_Store',
      html: `
        <p>Dear ${customerName},</p>
        <p>Thank you for shopping with us! Your order has been successfully placed.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p>You can view your order details using the link below:</p>
        <a href="${orderLink}" target="_blank">View Order</a>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best regards,</p>
        <p>The PS_Store Team</p>
      `,
    });
  }

  async sendLicenseEmail(
    email: string,
    customerName: string,
    licenses: { productName: string; licenseKey: string, skuName: string }[],
  ) {
    const licenseRows = licenses
      .map(
        (license) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${license.productName}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${license.skuName}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: left;">${license.licenseKey}</td>
          </tr>
        `
      )
      .join('');

    await this.mailer.sendMail({
      to: [{ name: customerName, address: email }],
      subject: 'Your Product Licenses - PS_Store',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f8f8f8; text-align: left;">
              <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; border: 1px solid #ddd;">SkuName</th>
              <th style="padding: 10px; border: 1px solid #ddd;">License Key</th>
            </tr>
            ${licenseRows}
          </table>
          <p>Dear ${customerName},</p>
          <p>Thank you for your purchase! Below are your product license details:</p>
          <p>If you have any issues or questions, feel free to reach out to our support team.</p>
          <p>Best regards,</p>
          <p>The PS_Store Team</p>
        </div>
      `,
    });
  }
}
