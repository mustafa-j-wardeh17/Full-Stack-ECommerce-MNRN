import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/shared/schema/cart';
import { AuthMiddleware } from 'src/middleware/auth';
import { CartRepository } from 'src/shared/repositories/cart.repository';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/middleware/roles.guard';
import { Users, UserSchema } from 'src/shared/schema/users';
import { UserRepository } from 'src/shared/repositories/user.repository';

@Module({
  controllers: [CartController],

  providers: [CartService, CartRepository, UserRepository, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }],

  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema
      },
      {
        name: Users.name,
        schema: UserSchema
      },
    ])
  ]

})
export class CartModule implements NestModule {
  // to apply auth middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(CartController);
  }
}
