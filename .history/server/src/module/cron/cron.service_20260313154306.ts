import { Injectable } from "@nestjs/common";
import { Cron} from '@nestjs/schedule';

@Injectable()
export class CronSerivce {
    @Cron(@Cron('*/5 * * * *'))
    async () {

    }
}