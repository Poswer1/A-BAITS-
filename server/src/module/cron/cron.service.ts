import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';
import { LotModel } from "src/models/lot.model";
import { NotificationGateway } from "../notification/notification.gateway";
import { PaymentService } from "../payment/payment.service";
import { buildRelistedDate } from '../lot/time.utils';

@Injectable()
export class CronSerivce {

    constructor(
        private readonly paymentService: PaymentService,
        private readonly notificationGateWay: NotificationGateway
    ) {}

    @Cron('*/1 * * * *')
    async checkLot() {
        try {
            const nowDate = new Date()
            const expiredLots = await LotModel.find({
                date: {$lte: nowDate},
                status: 'Active'
            })
            if (expiredLots.length === 0) return

            for (const lot of expiredLots) {
                try {
                                 if (lot.historyBid.length > 0) {
                                        const winner = lot.historyBid[lot.historyBid.length - 1]
                    await this.paymentService.buyLot(winner.author.toString(), {lotId:lot._id.toString(), price: winner.currentBid})
                    } else {
                                                const now = new Date()
                                                const durationMs = lot.auctionDurationMs ?? (lot.createdAt ? lot.date.getTime() - lot.createdAt.getTime() : 0)
                                                if (!Number.isFinite(durationMs) || durationMs <= 0) {
                                                        console.error('Некорректная длительность лота', lot._id)
                                                        continue
                                                }

                        if(lot.autoReExtension) {
                                                        const nextDate = buildRelistedDate(now, durationMs)
                                                        const update = await LotModel.updateOne(
                                                            {
                                                                _id: lot._id,
                                                                status: 'Active',
                                                                date: { $lte: now },
                                                                'historyBid.0': { $exists: false },
                                                            },
                                                            { $set: { date: nextDate, auctionDurationMs: durationMs } },
                                                        )
                                                        if (update.modifiedCount === 0) continue
                                                        console.log('лот перевыставлен')
                        } else {
                                                        const update = await LotModel.updateOne(
                                                            {
                                                                _id: lot._id,
                                                                status: 'Active',
                                                                date: { $lte: now },
                                                                'historyBid.0': { $exists: false },
                                                            },
                                                            { $set: { status: 'Completed', auctionDurationMs: durationMs } },
                                                        )
                                                        if (update.modifiedCount === 0) continue
                            console.log(`Лот ${lot._id} завершён без ставок`)
                        }
                    }

                    if (lot.historyBid.length === 0 && lot.autoReExtension) {
                    await this.notificationGateWay.sendNotification({to:lot.author.toString(), notification: 'lotRelisted',lotId: lot._id.toString()})
                    } else if (lot.historyBid.length === 0 && !lot.autoReExtension) {
                    await this.notificationGateWay.sendNotification({to:lot.author.toString(),notification: 'lotNotRedeemed', lotId: lot._id.toString()})
                    }
                    
                } catch (error) {
                    console.error('CRON ошибка лота', lot._id, error)
                } 
            }
        } catch (error) {
            throw error
        }
    }
}