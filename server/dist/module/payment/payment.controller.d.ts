import { PaymentService } from './payment.service';
import { BuyLotDto } from './payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    buyLot(req: any, dto: BuyLotDto): Promise<{
        success: boolean;
    }>;
}
