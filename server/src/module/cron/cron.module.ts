import { Module } from "@nestjs/common";
import { NotificationModel } from "src/models/notification.model";
import { NotificationModule } from "../notification/notification.module";
import { CronSerivce } from "./cron.service";
import { PaymentModule } from "../payment/payment.module";

@Module({
    imports: [NotificationModule, PaymentModule],
    providers: [CronSerivce],
})

export class CronModule {}