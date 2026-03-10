import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';
export declare class PaymentService {
    private readonly notificationGateWay;
    constructor(notificationGateWay: NotificationGateway);
    buyLot(userId: string, dto: BuyLotDto): Promise<{
        success: boolean;
    } | undefined>;
}
