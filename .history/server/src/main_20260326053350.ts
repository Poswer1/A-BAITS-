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
  app.enableCors(
    {
    origin: ['http://192.168.0.158:3000', 'http://localhost:3000', 'https://a-baits.onrender.com'],
    credentials: true // говорит принимать токен
  }
)

const PORT = process.env.PORT 
  await app.listen(PORT, '0.0.0.0');
  console.log(`Server started on ${PORT}`);
}
Main();
