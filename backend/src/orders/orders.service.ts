import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { checkoutDtoArr } from './dto/checkout.dto';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { OrdersRepository } from 'src/shared/repositories/order.repository';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import config from 'config'
import { userTypes } from 'src/shared/schema/users';
import { Orders } from 'src/shared/schema/order';


@Injectable()
export class OrdersService {
  constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    @Inject(OrdersRepository) private readonly orderDB: OrdersRepository,
    @Inject(ProductRepository) private readonly productDB: ProductRepository,
    @Inject(UserRepository) private readonly userDB: UserRepository,

  ) { }
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
      })

      const query = {} as Record<string, any>;

      if (userDetails.type === userTypes.CUSTOMER) {
        query.userId = user._id.toString()
      }

      if (status) {
        query.status = status;
      }
      const orders = await this.orderDB.find(query)
      return {
        message: "Order fetched successfully",
        success: true,
        result: {
          orders: orders
        }
      }
    } catch (error) {
      throw error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }


  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
