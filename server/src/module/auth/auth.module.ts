import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoggingModule } from '../admin/logging/logging.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'V9f$8kLm2pQz!X7rW4u@H1yT6bE3nG0',
      signOptions: { expiresIn: '30d' },
    }),
    LoggingModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,EmailService],
  exports: [JwtModule]
})
export class AuthModule {}
