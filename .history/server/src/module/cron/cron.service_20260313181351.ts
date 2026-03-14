import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';
import { LotModel } from "src/models/lot.model";
import { NotificationGateway } from "../notification/notification.gateway";
import { PaymentService } from "../payment/payment.service";

@Injectable()
export class CronSerivce {

    constructor(
        private readonly paymentService: PaymentService,
        private readonly notificationGateWay: NotificationGateway
    ) {}

    @Cron('*/1 * * * *')
    async checkLot() {
        console.log('CRON ПРОВЕРЯЕТ')
        try {
            const nowDate = new Date()
            const expiredLots = await LotModel.find({
                date: {$lte: nowDate},
                status: 'Active'
            })
            if (expiredLots.length === 0) return

            for (const lot of expiredLots) {
                if (lot.historyBid.length > 0) {
                    const winner = lot.historyBid[0] 
                    await pa
                } else {
                    if(lot.autoReExtension) {
                        const oneDayMs = 24 * 60 * 60 * 1000;
                        const sevenDaysMs = 7 * oneDayMs;
                        const newDate = new Date(lot.date.getTime() + sevenDaysMs)
                        const [hours, minutes] = lot.dateTime.split(':').map(Number)

                        newDate.setHours(hours, minutes, 0, 0)

                        lot.date = newDate
                        await this.notificationGateWay.sendNotification({lotId: lot.lotNumber, to: lot.author.toString(), notification: 'lotRelisted'})
                        console.log('лот перевыставлен')
                    } else {
                        lot.status = 'Archive'
                        await this.notificationGateWay.sendNotification({lotId: lot.lotNumber, to: lot.author.toString(), notification: 'lotNotRedeemed'})
                        console.log(`Лот ${lot._id} завершён без ставок`)
                    }
                }

                await lot.save()
            }
        } catch (error) {
            console.log('ошибка работы CRON')
            return
        }
    }
}