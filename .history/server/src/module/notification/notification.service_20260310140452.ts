import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { LotModel } from 'src/models/lot.model';
import { NotificationModel } from 'src/models/notification.model';

@Injectable()
export class NotificationService {

    async getHistoryNotification(userId:string) {
        const notifications = await NotificationModel.find({to: userId})
        .populate('lot', 'name lotNumber')
        if(!notifications) return []
        return notifications
    }

    async read(userId:string) {
        await NotificationModel.updateMany(
            {to:userId, read: false},
            {$set:{read:true}}
        )
    }

    async checkRead(userId:string) {
        const notification = await NotificationModel.find({to:userId})
        return notification.some((n:any) => !n.read)
    }

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
                lot: lot._id
            })
            await newNotification.populate('lot', 'name lotNumber')
            return newNotification
        } catch (error) {
            console.log('ошибка отправки уведомления', error)
            return null
        }
    }

}
