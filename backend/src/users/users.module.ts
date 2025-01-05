import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/shared/schema/users';
import { RolesGuard } from 'src/middleware/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthMiddleware } from 'src/middleware/auth';
import { MailerService } from 'src/middleware/mailer';
import { SubscriberRepository } from 'src/shared/repositories/subscriber.repository';
import { Subscriber, SubscriberSchema } from 'src/shared/schema/subscriber';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, SubscriberRepository, MailerService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  imports: [
    MongooseModule.forFeature([
      {
      name: Users.name,
      schema: UserSchema
    },
      {
      name: Subscriber.name,
      schema: SubscriberSchema
    },
  ]),
  ]
})
export class UsersModule implements NestModule {
  // to apply auth middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {
          path: '/users', method: RequestMethod.GET,
        },
        {
          path: '/users/wishlist', method: RequestMethod.ALL,
        },
        {
          path: '/users/wishlist/selected-items', method: RequestMethod.DELETE,
        },
        {
          path: '/users/subscriber', method: RequestMethod.ALL,
        },
      );
  }
}
