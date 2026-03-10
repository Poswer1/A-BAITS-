import { Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class PaymentService {
    async buyLot (userId:string, lotId:string) {
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
        if(lot.startPrice)
    }
}
