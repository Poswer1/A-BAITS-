import { Module } from "@nestjs/common";
import { NotificationModule } from "../notification/notification.module";
import { CronSerivce } from "./cron.service";
import { ChatCronService } from "./chat-cron.service";
import { PaymentModule } from "../payment/payment.module";
import { cronBlocked } from "./cronBlocked";

@Module({
    imports: [NotificationModule, PaymentModule],
    providers: [CronSerivce, cronBlocked, ChatCronService],
})

export class CronModule {}