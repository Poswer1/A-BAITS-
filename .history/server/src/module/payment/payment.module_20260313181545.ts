import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentGateway } from './payment.gateway';
import { AuthModule } from '../auth/auth.module';
import { NotificationModule } from '../notification/notification.module';


@Module({
  imports: [AuthModule,NotificationModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentGateway],
  exports
})
export class PaymentModule {}
