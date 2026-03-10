import { Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';
import { NotificationModel } from 'src/models/notification.model';

@Injectable()
export class NotificationService {
    async newNotification(lotId:string, from:string, to:string, notification:string) {
        const lot = await LotModel.findOne({lotNumber:lotId})
        if(!lot) {
            console.log('лот не найден при отправке сообщения')
            return
        }

        const newNotification = await NotificationModel.create(
        {
            to: to,
            from: from,
            notification: notification,
            lot: lotId
        },
        {new:true}
    )

    }
}
