import { BadRequestException, Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';
import { UserModel } from 'src/models/user.model';
import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { ChatModel } from 'src/models/chat.model';

@Injectable()
export class PaymentService {

    constructor(private readonly notificationGateWay: NotificationGateway) {}
    const session = await mongoose.startSession()

    async buyLot (userId:string, dto:BuyLotDto) {

        const {lotId, price} = dto

        const lot = await LotModel.findById(lotId)
        if(!lot) {
            console.log('лот не найден при покупки')
            return
        }
        const user = await UserModel.findById(userId)
        if(!user) {
            console.log('пользователь не найден при покупки')
            return
        }

        const lotPrice = price ?? lot.blitzPrice
        if(!lotPrice) return

        if(user.balance < lotPrice) {
           console.log('NoMoney')
           throw new BadRequestException('NoMoney')
        }

        const updateLot = await LotModel.updateOne(
            {_id:lotId, winner: { $exists: false }, status: 'Active'}, //условие
            {$set: { winner: userId, status: 'Completed' }} 
        )
        if(updateLot.modifiedCount === 0) {
            console.log('LotAlreadySold')
            throw new BadRequestException('LotAlreadySold')
        }

       
        const userUpdate = await UserModel.updateOne(
            { _id: userId, balance: { $gte: lotPrice } },
            { $inc: { balance: -lotPrice } },
        )
        if(userUpdate.modifiedCount === 0) {
            console.log('NoMoney')
            throw new BadRequestException('NoMoney')
        }

        try {
            await ChatModel.create(
                {
                    userTo:lot.author,
                    userFrom: userId,
                    lot: lot._id,
                    type: 'deal'
                }
            )
        } catch (error) {
            console.log('ошибка при создание чата сделки', error)
            return
        }

       this.notificationGateWay.sendNotification({lotId, to:lot.author.toString(), from:userId.toString(), notification: 'lotPurchased'})

       return {success: true}

    }
}
