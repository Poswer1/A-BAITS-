import { BadRequestException, Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';
import { UserModel } from 'src/models/user.model';
import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { ChatModel } from 'src/models/chat.model';
import mongoose from 'mongoose';

@Injectable()
export class PaymentService {

    constructor(private readonly notificationGateWay: NotificationGateway) {}
    
    async buyLot (userId:string, dto:BuyLotDto) {
        const session = await mongoose.startSession()

        const {lotId, price} = dto
        try {
            
        } catch (error) {
            
        }

       return {success: true}

    }
}
