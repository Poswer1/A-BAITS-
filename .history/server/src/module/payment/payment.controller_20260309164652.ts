import { Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,) {}

  @UseGuards(JwtAuthGuard)
  @Patch('buyLot')
  async buyLot (@Req() req:any) {
    const userId = (req.user as any)._id
  }

}
