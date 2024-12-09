import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config'
import { AllExceptionFilter } from './httpExceptionFilter';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [MongooseModule.forRoot(config.get('mongodbUrl'), {
    w: 1,
  }), UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionFilter
    }
  ],
})
export class AppModule { }
