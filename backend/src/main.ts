import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config'
import { TransformationInterception } from './responseInterceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformationInterception())
  await app.listen(config.get('port'));
}
bootstrap();
