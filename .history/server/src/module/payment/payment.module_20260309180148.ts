import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentGateway } from './payment.gateway';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [AuthModule,Notif],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentGateway],
})
export class PaymentModule {}
