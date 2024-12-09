import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config'
import { TransformationInterception } from './responseInterceptor';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()) // to apply working with cookies
  app.useGlobalInterceptors(new TransformationInterception())
  await app.listen(config.get('port'));
}
bootstrap();
