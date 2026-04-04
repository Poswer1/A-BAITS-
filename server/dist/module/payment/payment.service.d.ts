import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { EmailService } from '../email/email.service';
import { LoggingService } from '../admin/logging/logging.service';
export declare class PaymentService {
    private readonly notificationGateWay;
    private readonly emailService;
    private readonly loggingService;
    constructor(notificationGateWay: NotificationGateway, emailService: EmailService, loggingService: LoggingService);
    buyLot(userId: string, dto: BuyLotDto): Promise<{
        success: boolean;
    }>;
    create(lot: string, sum: number, user: string): Promise<{
        success: boolean;
    }>;
}
