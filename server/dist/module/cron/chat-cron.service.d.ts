import { NotificationGateway } from "../notification/notification.gateway";
export declare class ChatCronService {
    private readonly notificationGateWay;
    constructor(notificationGateWay: NotificationGateway);
    checkStaleChats(): Promise<void>;
}
