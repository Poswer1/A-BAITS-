import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';

@Injectable()
export class CronSerivce {
    @Cron('*/1 * * * *')
    async checkLot() {
        try {
            const expired
        } catch (error) {
            
        }
    }
}