import { JwtService } from "@nestjs/jwt";
import { Server, Socket } from "socket.io";
import { NotificationService } from "./notification.service";
export declare class NotificationGateway {
    private readonly jwtService;
    private readonly notificationService;
    constructor(jwtService: JwtService, notificationService: NotificationService);
    server: Server;
    readNotification(client: Socket): Promise<void>;
    checkRead(client: Socket): Promise<void>;
    getHistoryNotification(client: Socket): Promise<void>;
    sendNotification(data: {
        to: string;
        notification: string;
        lotId: string;
        from?: string;
    }): Promise<void>;
    removeChatNotifications(to: string, lotId: string): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}
