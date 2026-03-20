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
    
    async buyLot(userId: string, dto: BuyLotDto) {
        const session = await mongoose.startSession()

        const { lotId, price } = dto

        try {
            session.startTransaction()

            const lot = await LotModel.findById(lotId).session(session)
            if (!lot) throw new Error('лот не найден')

            const user = await UserModel.findById(userId).session(session)
            if (!user) throw new Error('пользователь не найден')

            const lotPrice = price ?? lot.blitzPrice
            if (!lotPrice) throw new Error('нет цены')

            if (user.balance < lotPrice) {
            throw new BadRequestException('NoMoney')
            }

            const updateLot = await LotModel.updateOne(
            { _id: lotId, winner: { $exists: false }, status: 'Active' },
            { $set: { winner: userId, status: 'Completed' } },
            { session } // ✅ ВАЖНО
            )

            if (updateLot.modifiedCount === 0) {
            throw new BadRequestException('LotAlreadySold')
            }

            const userUpdate = await UserModel.updateOne(
            { _id: userId, balance: { $gte: lotPrice } },
            { $inc: { balance: -lotPrice } },
            { session } // ✅ ВАЖНО
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
            { session } // ✅ ВАЖНО (у create массив!)
            )

            await session.commitTransaction()

            // ❗ уведомления ЛУЧШЕ отправлять после commit
            this.notificationGateWay.sendNotification({
            lotId,
            to: lot.author.toString(),
            from: userId.toString(),
            notification: 'lotPurchased'
            })

            return { success: true }

        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
        }
}
