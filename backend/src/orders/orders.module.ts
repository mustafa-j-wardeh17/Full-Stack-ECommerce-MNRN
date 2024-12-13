import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from 'src/shared/repositories/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrderSchema } from 'src/shared/schema/order';
import { AuthMiddleware } from 'src/middleware/auth';
import config from 'config'
import { Products, ProductSchema } from 'src/shared/schema/products';
import { License, LicenseSchema } from 'src/shared/schema/license';
import { Users, UserSchema } from 'src/shared/schema/users';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/middleware/roles.guard';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { MailerService } from 'src/middleware/mailer';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService,
    UserRepository,
    ProductRepository,
    OrdersRepository,
    MailerService, {
      provide: APP_GUARD,
      useClass: RolesGuard
    }],
  imports: [
    StripeModule.forRoot(StripeModule, {
      apiKey: config.get('stripe.secret_key')
    }),
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductSchema },
      { name: License.name, schema: LicenseSchema },
      { name: Users.name, schema: UserSchema },
      { name: Orders.name, schema: OrderSchema }
    ])
  ]
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // .exclude(
      //   { path: 'api/v1/orders/webhook', method: RequestMethod.POST } // Exclude webhook
      // )
      .forRoutes(OrdersController);
  }
}
