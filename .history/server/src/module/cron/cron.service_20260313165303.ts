import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';
import { LotModel } from "src/models/lot.model";

@Injectable()
export class CronSerivce {
    @Cron('*/1 * * * *')
    async checkLot() {
        try {
            const nowDate = new Date()
            const expiredLots = await LotModel.find({
                date: 
                    $lte: {nowDate}
                
            })
        } catch (error) {
            
        }
    }
}