import { Module } from "@nestjs/common";
import { NotificationModel } from "src/models/notification.model";
import { NotificationModule } from "../notification/notification.module";
import { CronSerivce } from "./cron.service";

@Module({
    imports: [NotificationModule, Pa],
    providers: [CronSerivce],
})

export class CronModule {}