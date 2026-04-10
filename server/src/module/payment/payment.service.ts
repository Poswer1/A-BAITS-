import { BadRequestException, Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';
import { UserModel } from 'src/models/user.model';
import { BuyLotDto } from './payment.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { ChatModel } from 'src/models/chat.model';
import mongoose from 'mongoose';
import { TransactionModel } from 'src/models/transactions.model';
import { EmailService } from '../email/email.service';
import { LoggingService } from '../admin/logging/logging.service';
import { FinanceService } from '../admin/finance/finance.service';

@Injectable()
export class PaymentService {

    constructor(
        private readonly notificationGateWay: NotificationGateway,
        private readonly emailService:EmailService,
        private readonly financeService:FinanceService,
        private readonly loggingService:LoggingService
    ) {}
    
    async buyLot(userId: string, dto: BuyLotDto) {

    const {lotId, price} = dto

    const session = await mongoose.startSession()
    try {
        
        session.startTransaction()
        

        const lot = await LotModel.findById(lotId)
        .session(session)
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

        if (userUpdate.modifiedCount === 0) throw new BadRequestException('NoMoney')
        
        const priceWithCommission = lotPrice - (lotPrice * 0.05)

        const authorUpdate = await UserModel.updateOne(
            {_id: lot.author},
            {$inc: {balance: +priceWithCommission}},
            { session }
        )

        if (authorUpdate.modifiedCount === 0) throw new BadRequestException('ErrorDepositAuthorLot')

        await ChatModel.create(
        [
            {
            users: [lot.author, userId],
            lot: lot._id,
            type: 'deal'
            }
        ],
        { session } 
        )
        
         await session.commitTransaction()

        try {
            await this.financeService.createTransaction(lotPrice, userId.toString(), 'Debit', lot._id.toString())
            await this.financeService.createTransaction(priceWithCommission, lot.author.toString(), 'Deposit', lot._id.toString())

            await this.loggingService.newLog(userId, 'buyLot', lotId)

            await this.notificationGateWay.sendNotification({
                to: lot.author.toString(),
                from: userId.toString(),
                notification: 'lotPurchased',
                lotId,
            })

            const authorEmail = await UserModel.findById(lot.author).select('email')
            if(!authorEmail) throw new BadRequestException('authorEmailNotFound')

            await this.emailService.sendEmail(
                authorEmail?.email.toString(),
                'Тест Resend',
                '<h1>Лот куплен!</h1>'
            )
            
        } catch (externalError) {
            console.error('Ошибка внешних операций:', externalError);
        }

        return { success: true }

    } catch (error) {
        await session.abortTransaction()
        throw error
    } finally {
        session.endSession()
    }
    }

   
}
