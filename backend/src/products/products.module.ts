import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from 'src/shared/schema/products';
import { Users } from 'src/shared/schema/users';
import { StripeModule } from '@golevelup/nestjs-stripe';
import config from 'config';
import { AuthMiddleware } from 'src/middleware/auth';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/middleware/roles.guard';

@Module({
  controllers: [ProductsController],

  providers: [ProductsService, ProductRepository, UserRepository, {
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
        schema: Users
      },
    ]),
    StripeModule.forRoot(StripeModule, {
      apiKey: config.get('stripe.secret_key'),
    }),
  ]
})
export class ProductsModule implements NestModule {
  // to apply auth middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ProductsController);
  }
}