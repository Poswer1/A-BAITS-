import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { LotModel } from 'src/models/lot.model';
import { NotificationModel } from 'src/models/notification.model';

@Injectable()
export class NotificationService {

    async getHistoryNotification(userId:string) {
        const notifications = await NotificationModel.find({to: userId})
        .sort({ createdAt: -1 })
        .populate('lot', 'name lotNumber')
        .populate('from', 'name avatar')
        if(!notifications) return []
        return notifications
    }

    async read(userId:string) {
        await NotificationModel.updateMany(
            {to:userId, read: false},
            {$set:{read:true}}
        )
        return
    }

    async checkRead(userId:string) {
        const notification = await NotificationModel.find({to:userId})
        return notification.some((n:any) => !n.read)
    }

    async removeChatNotifications(to: string, lotId: string) {
        await NotificationModel.deleteMany({
            to,
            lot: lotId,
            notification: 'newChatMessage',
        })
    }

    async createNotification(to:string, notification:string, lotId:string, from?: string) {
        
        const lot = await LotModel.findById(lotId)
        if(!lot) {
            console.log('лот не найден при отправке уведомления')
            return
        }

        try {
          const newNotification = notification === 'newChatMessage'
            ? await NotificationModel.findOneAndUpdate(
                { to, lot: lot._id, notification },
                {
                    $set: {
                        ...(from && { from: new Types.ObjectId(from) }),
                        read: false,
                    },
                },
                { new: true, upsert: true, setDefaultsOnInsert: true },
            )
            : await NotificationModel.create(
                {
                    to,
                    ...(from && { from: new Types.ObjectId(from) }),
                    notification,
                    lot: lot._id,
                    read:false
                })
          if (!newNotification) return null
            await newNotification.populate('lot', 'name lotNumber')
            await newNotification.populate('from', 'name avatar')
            return newNotification
        } catch (error) {
            console.log('ошибка отправки уведомления', error)
            return null
        }
    }

}
