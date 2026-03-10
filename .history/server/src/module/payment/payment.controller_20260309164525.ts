import { Controller, Patch } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly jwt
  ) {}

  @Patch('buyLot')
  async buyLot () {

  }

}
