import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';
import { LotModel } from "src/models/lot.model";
import { NotificationService } from "../notification/notification.service";
import { NotificationGateway } from "../notification/notification.gateway";

@Injectable()
export class CronSerivce {

    constructor(
        private readonly notificationService: NotificationService,
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
                    lot.winner = winner.author
                    lot.status = 'Completed'
                    console.log(`Лот ${lot._id} завершён, победитель ${winner.author}`)
                    const newNotification = await this.notificationService.createNotification(lot._id, )
                } else {
                    lot.status = 'Archive'
                    console.log(`Лот ${lot._id} завершён без ставок`)
                }

                await lot.save()
            }
        } catch (error) {
            console.log('ошибка работы CRON')
            return
        }
    }
}