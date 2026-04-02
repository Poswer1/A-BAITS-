import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { EmailService } from '../email/email.service';
export declare class PaymentService {
    private readonly notificationGateWay;
    private readonly emailService;
    constructor(notificationGateWay: NotificationGateway, emailService: EmailService);
    buyLot(userId: string, dto: BuyLotDto): Promise<{
        success: boolean;
    }>;
    create(lot: string, sum: number, user: string): Promise<{
        success: boolean;
    }>;
}
