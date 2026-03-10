import { BadRequestException, Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';
import { UserModel } from 'src/models/user.model';
import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';

@Injectable()
export class PaymentService {

    constructor(private readonly notificationGateWay: NotificationGateway) {}

    async buyLot (userId:string, dto:BuyLotDto) {

        const {lotId, price} = dto

        const lot = await LotModel.findOne({lotNumber: lotId})
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
            {lotNumber:lotId, winner: null}, //условие
            {$set: { winner: userId, status: 'Completed' }} 
        )
        if(!updateLot) {
            console.log('LotAlreadySold')
            throw new BadRequestException('LotAlreadySold')
        }
        

       
        const userUpdate = await UserModel.updateOne(
            { _id: userId, balance: { $gte: lotPrice } },
            { $inc: { balance: -lotPrice } },
            )
       } catch (error) {
        console.log('NoMoney')
        throw new BadRequestException('NoMoney')
       }

       this.notificationGateWay.sendNotification({lotId, to:lot.author.toString(), from:userId.toString(), notification: 'lotPurchased'})

       return {success: true}

    }
}
