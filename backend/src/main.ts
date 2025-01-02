import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config'
import { TransformationInterception } from './responseInterceptor';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: config.get('frontendbase'),
    credentials: true
  })

  // To migrate webhook
  app.use('/api/v1/orders/webhook', bodyParser.raw({ type: 'application/json' }));

  app.setGlobalPrefix(config.get('appPrefix'));
  app.useGlobalInterceptors(new TransformationInterception());
  await app.listen(config.get('port'), () => {
    return console.log(`Server is running on port ${config.get('port')}`);
  });
}
bootstrap();
