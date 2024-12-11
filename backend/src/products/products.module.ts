import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from 'src/shared/schema/products';
import { Users, UserSchema } from 'src/shared/schema/users';
import { StripeModule } from '@golevelup/nestjs-stripe';
import config from 'config';
import { AuthMiddleware } from 'src/middleware/auth';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/middleware/roles.guard';
import { License, LicenseSchema } from 'src/shared/schema/license';
import { Orders, OrderSchema } from 'src/shared/schema/order';
import { OrdersRepository } from 'src/shared/repositories/order.repository';

@Module({
  controllers: [ProductsController],

  providers: [ProductsService, ProductRepository, UserRepository, OrdersRepository, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }],

  imports: [
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: ProductSchema
      },
      {
        name: Users.name,
        schema: UserSchema
      },
      {
        name: License.name,
        schema: LicenseSchema
      },
      {
        name: Orders.name,
        schema: OrderSchema
      },
    ]),
    StripeModule.forRoot(StripeModule, {
      apiKey: config.get('stripe.secret_key')
    }),
  ]
})
export class ProductsModule implements NestModule {
  // to apply auth middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude( // for these 2 routes we are not gonna use the auth validation
        {
          path: `${config.get('appPrefix')}/products`,
          method: RequestMethod.GET
        },
        {
          path: `${config.get('appPrefix')}/products:id`,
          method: RequestMethod.GET
        }
      )
      .forRoutes(ProductsController);
  }
}