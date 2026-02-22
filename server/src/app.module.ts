import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConnectDB } from './utils/connectDB';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { LotModule } from './module/lot/lot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true, // чтобы env был доступен везде
    }),
    AuthModule,
    UserModule,
    LotModule,
  ],
  providers: [ConnectDB]
})
export class AppModule {}
 