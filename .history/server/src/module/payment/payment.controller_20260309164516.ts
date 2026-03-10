import { Controller, Patch } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly 
    paymentService: PaymentService) {}

  @Patch('buyLot')
  async buyLot () {

  }

}
