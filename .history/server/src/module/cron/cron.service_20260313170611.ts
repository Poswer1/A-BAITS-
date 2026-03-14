import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';
import { LotModel } from "src/models/lot.model";

@Injectable()
export class CronSerivce {
    @Cron('*/1 * * * *')
    async checkLot() {
        console.log('CRON ПРОВЕРЯЕТ')
        try {
            const nowDate = new Date()
            const expiredLots = await LotModel.find({
                date: {$lte: nowDate},
                status: 'Active'
            })
            if(expiredLots.length > 0) {
                for(const lot of expiredLots) {
                    if(lot.historyBid.length > 0) {
                        const winner = lot.historyBid[0]
                        lot.
                    } else {
                        console.log('Ставок нет, лот не был куплен');
                        return
                    }
                }
            }
        } catch (error) {
            console.log('ошибка работы CRON')
            return
        }
    }
}