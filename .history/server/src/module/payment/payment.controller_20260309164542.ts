import { Controller, Patch, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,) {}

  @UseGuards()
  @Patch('buyLot')
  async buyLot () {

  }

}
