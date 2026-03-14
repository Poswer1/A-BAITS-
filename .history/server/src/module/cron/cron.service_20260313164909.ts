import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';
import { LotModel } from "src/models/lot.model";

@Injectable()
export class CronSerivce {
    @Cron('*/1 * * * *')
    async checkLot() {
        try {
            const expiredLots = await LotModel.find({
                
            })
        } catch (error) {
            
        }
    }
}