import { BadRequestException, Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';
import { UserModel } from 'src/models/user.model';
import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { ChatModel } from 'src/models/chat.model';
import mongoose from 'mongoose';
import { TransactionModel } from 'src/models/transactions.model';
import { EmailService } from '../email/email.service';

@Injectable()
export class PaymentService {

    constructor(
        private readonly notificationGateWay: NotificationGateway,
        private readonly emailService:EmailService
    ) {}
    
    async buyLot(userId: string, dto: BuyLotDto) {

    const {lotId, price} = dto

    const session = await mongoose.startSession()
    try {
        
        session.startTransaction()
        

        const lot = await LotModel.findById(lotId).session(session)
        if (!lot) throw new Error('лот не найден')

        const lotPrice = price ?? lot.blitzPrice
        if (!lotPrice) throw new Error('нет цены')

        const updateLot = await LotModel.updateOne(
        { _id: lotId, winner: { $exists: false }, status: 'Active' },
        { $set: { winner: userId, status: 'Completed' } },
        { session } 
        )

        if (updateLot.modifiedCount === 0) {
        throw new BadRequestException('LotAlreadySold')
        }

        const userUpdate = await UserModel.updateOne(
        { _id: userId, balance: { $gte: lotPrice } },
        { $inc: { balance: -lotPrice } },
        { session } 
        )

        if (userUpdate.modifiedCount === 0) {
        throw new BadRequestException('NoMoney')
        }

        await ChatModel.create(
        [
            {
            userTo: lot.author,
            userFrom: userId,
            lot: lot._id,
            type: 'deal'
            }
        ],
        { session } 
        )
        
         await session.commitTransaction()

        try {
             await this.create(lot._id.toString(), lotPrice, userId)

            await this.notificationGateWay.sendNotification({
                lotId,
                to: lot.author.toString(),
                from: userId.toString(),
                notification: 'lotPurchased'
            })

            await this.emailService.sendEmail(
                'knozenko@gmail.com',
                "привент",
                '<h1>Тестовое письмо</h1>'
            )
        } catch (error) {
            throw
        }

        return { success: true }

    } catch (error) {
        await session.abortTransaction()
        throw error
    } finally {
        session.endSession()
    }
    }

    async create(lot:string, sum:number, user:string) {
        const createdTransaction = await TransactionModel.create({
            lot,
            sum,
            user
        })
        if(!createdTransaction)throw new Error("Transaction creation failed");
        return {success:true}
    }
}
