import { Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';
import { Type } from '@nestjs/common';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,) {}

  @UseGuards(JwtAuthGuard)
  @Patch('buyLot')
  async buyLot (@Req() req:Express) {
    const userId = (req)
  }

}
