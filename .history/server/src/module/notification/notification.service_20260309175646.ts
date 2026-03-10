import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { LotModel } from 'src/models/lot.model';
import { NotificationModel } from 'src/models/notification.model';

@Injectable()
export class NotificationService {
    async createNotification(lotId:string, from:string, to:string, notification:string) {
        
        const lot = await LotModel.findOne({lotNumber:lotId})
        if(!lot) {
            console.log('лот не найден при отправке уведомления')
            return
        }

        try {
          const newNotification = await NotificationModel.create(
            {
                to,
                from,
                notification,
                lot: Types.ObjectId() lotId
            })
            return newNotification
        } catch (error) {
            console.log('ошибка отправки уведомления', error)
            return null
        }
    }

}
