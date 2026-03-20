import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';
import { LotModel } from "src/models/lot.model";
import { NotificationGateway } from "../notification/notification.gateway";
import { PaymentService } from "../payment/payment.service";
import mongoose from "mongoose";

@Injectable()
export class CronSerivce {

    constructor(
        private readonly paymentService: PaymentService,
        private readonly notificationGateWay: NotificationGateway
    ) {}

    @Cron('*/1 * * * *')
    async checkLot() {
        console.log('CRON ПРОВЕРЯЕТ')
        const session = await mongoose.startSession()
        try {
            const nowDate = new Date()
            const expiredLots = await LotModel.find({
                date: {$lte: nowDate},
                status: 'Active'
            })
            if (expiredLots.length === 0) return

            for (const lot of expiredLots) {
                try {
                    
                } catch (error) {
                    
                }
            }
            await session.commitTransaction()
        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    }
}