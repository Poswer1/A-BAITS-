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
  app.enableCors({
    origin: [
      'http://192.168.1.66:3000',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://80.91.79.221:3000',
      'http://a-baits.com.ua',
      'https://a-baits.com.ua'
    ],
    credentials: true
  })

const PORT = process.env.PORT || 3002
  await app.listen(PORT, '0.0.0.0');
  console.log(`Server started on ${PORT}`);
}
Main();
