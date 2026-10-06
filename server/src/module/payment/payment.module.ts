import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentGateway } from './payment.gateway';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';
import { EmailModule } from '../email/email.module';
import { LoggingModule } from '../admin/logging/logging.module';
import { FinanceModule } from '../admin/finance/finance.module';


@Module({
  imports: [AuthModule,NotificationModule, EmailModule, LoggingModule, FinanceModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentGateway],
  exports: [PaymentService]
})
export class PaymentModule {}
