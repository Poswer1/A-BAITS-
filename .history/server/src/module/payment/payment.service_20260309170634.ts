import { BadRequestException, Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';
import { UserModel } from 'src/models/user.model';
import { BuyLotDto } from './payment.dto';

@Injectable()
export class PaymentService {
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

        try {
            await LotModel.updateMany(
                {lotNumber:lotId, winner: null}, //условие
                {$set: { winner: userId, status: 'Completed' }} 
            )
        } catch (error) {
            throw new BadRequestException('AlreadyPurchased')
        }

       try {
        await UserModel.updateMany(
  { _id: userId, balance: { $gte: lotPrice } },  // фильтр: баланс >= lotPrice
  { $inc: { balance: -lotPrice } }              // уменьшаем баланс
)
       } catch (error) {
        throw new BadRequestException('NoMoney')
       }

    }
}
