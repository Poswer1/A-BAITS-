import { NotificationGateway } from "../notification/notification.gateway";
import { PaymentService } from "../payment/payment.service";
export declare class CronSerivce {
    private readonly paymentService;
    private readonly notificationGateWay;
    constructor(paymentService: PaymentService, notificationGateWay: NotificationGateway);
    checkLot(): Promise<void>;
}
