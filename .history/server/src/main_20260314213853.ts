import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import cookieParser from 'cookie-parser'

async function Main() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads'))) 
  app.use(cookieParser())
  // dirname текущия папка '..' поднять на уровень выше и в 'uploads' 
  // //express static отдает статические файлы (изображения, CSS, JS и т.д.) прямо по URL.
  app.enableCors({})
  await app.listen(3002, '0.0.0.0');
  console.log('Server started on http://localhost:3002');
}
Main();
