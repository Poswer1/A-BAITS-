import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { AuthModule } from "../auth/auth.module";
import { ChatGateway } from "./chat.gateway";
import { EmailModule } from "../email/email.module";
import { NotificationModule } from "../notification/notification.module";

@Module({
    imports: [AuthModule, EmailModule, NotificationModule],
    providers: [ChatService, ChatGateway],
    controllers: [ChatController],
    exports: [ChatGateway]
})

export class ChatModule {}