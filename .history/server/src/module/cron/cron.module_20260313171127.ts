import { Module } from "@nestjs/common";
import { NotificationModel } from "src/models/notification.model";
import { NotificationModule } from "../notification/notification.module";

@Module({
    imports: [NotificationModule]
})