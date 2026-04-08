import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectDB } from './utils/connectDB';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { LotModule } from './module/lot/lot.module';
import { ChatModule } from './module/chat/chat.module';
import { NotificationModule } from './module/notification/notification.module';
import { PaymentModule } from './module/payment/payment.module';
import { ReviewModule } from './module/review/review.module';
import { FavoritesModule } from './module/favorites/favorites.module';
import { CronSerivce } from './module/cron/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './module/cron/cron.module';
import { AdminModule } from './module/admin/admin.module';
import { EmailModule } from './module/email/email.module';
import { BlogModule } from './module/blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true, // чтобы env был доступен везде
    }),
    ScheduleModule.forRoot(), // позволяет использовать планировщики задач, то есть делать что-то по расписанию: cron, interval, timeout
    AuthModule,
    UserModule,
    LotModule,
    ChatModule,
    NotificationModule,
    PaymentModule,
    ReviewModule,
    FavoritesModule,
    CronModule,
    AdminModule,
    EmailModule,
    BlogModule
  ],
  providers: [ConnectDB]
})
export class AppModule {}
 