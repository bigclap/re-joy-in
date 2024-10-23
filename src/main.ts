import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from './app.module';
import { join } from 'path';
import * as expressLayouts from 'express-ejs-layouts';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {

  });
  app.useStaticAssets(join(__dirname, '..', 'frontend'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // Настройка express-ejs-layouts
  app.setViewEngine('ejs');

  app.use(expressLayouts);
  app.set('layout', 'layouts/main'); // Указываем основной layout
  // app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
