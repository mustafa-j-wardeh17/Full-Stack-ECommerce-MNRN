import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config'
import { TransformationInterception } from './responseInterceptor';
import cookieParser from 'cookie-parser';
// import csurf from 'csurf'
import * as bodyParser from 'body-parser';
// import { NextFunction, Request, Response } from 'express';
// const ROOT_IGNORED_PATHS = ['/api/v1/orders/webhook   ']

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })

  // To migrate webhook
  app.use('/api/v1/orders/webhook', bodyParser.raw({ type: 'application/json' }));

  // const csrfMiddleware = csurf({
  //   cookie: true
  // });

  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   if (ROOT_IGNORED_PATHS.includes(req.path)) {
  //     return next();
  //   }
  //   return csrfMiddleware(req, res, next)
  // })


  app.setGlobalPrefix(config.get('appPrefix'));
  app.useGlobalInterceptors(new TransformationInterception());
  await app.listen(config.get('port'), () => {
    return console.log(`Server is running on port ${config.get('port')}`);
  });
}
bootstrap();
