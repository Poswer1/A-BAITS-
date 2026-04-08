import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { EmailService } from '../email/email.service';
import { LoggingService } from '../admin/logging/logging.service';
import { FinanceService } from '../admin/finance/finance.service';
export declare class PaymentService {
    private readonly notificationGateWay;
    private readonly emailService;
    private readonly financeService;
    private readonly loggingService;
    constructor(notificationGateWay: NotificationGateway, emailService: EmailService, financeService: FinanceService, loggingService: LoggingService);
    buyLot(userId: string, dto: BuyLotDto): Promise<{
        success: boolean;
    }>;
}
