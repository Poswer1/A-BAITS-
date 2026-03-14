import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';

@Injectable()
export class CronSerivce {
    @Cron('0, 1, 0, 0')
    async () => {
        
    }
}