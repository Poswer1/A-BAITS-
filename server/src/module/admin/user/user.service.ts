import { BadRequestException, Injectable } from "@nestjs/common";
import { now } from "mongoose";
import { LotModel } from "src/models/lot.model";
import { UserModel } from "src/models/user.model";
import { FinanceService } from "../finance/finance.service";

@Injectable()
export class UserService {

    constructor(private readonly financeService:FinanceService) {}

    async getAllUser (page: number = 1, sort: string = 'createdAt', order: string = 'desc', search: string = '') {
        try {
            const limit = 20
            const skip = (Number(page) - 1) * limit
            const sortOrder = order === 'asc' ? 1 : -1
            const sortObj: any = { [sort]: sortOrder }

            const filter: any = {}
            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                ]
            }

            const [users, total] = await Promise.all([
                UserModel.find(filter)
                    .sort(sortObj)
                    .skip(skip)
                    .limit(limit),
                UserModel.countDocuments(filter)
            ])
            return { users, total }
        } catch (error) {
            throw new BadRequestException('ErrorGetListUser')
        }
    }

    async getAllUserCount() {
        const countUser = await UserModel.countDocuments()
        return countUser
    }

    async getCountRegisteredUsers() {
        const dateDay = new Date()
        dateDay.setDate(dateDay.getDate() - 1)
        const dateWeek = new Date()
        dateWeek.setDate(dateWeek.getDate() - 7)
        const dateMonth = new Date()
        dateMonth.setDate(dateMonth.getDate() - 30)
        const countUser = await UserModel.aggregate([
            {
                $match: { // $match фильтр
                    createdAt: { $gte: dateMonth } // за последний месяц
                }
            },
            {
                $group: {
                    _id: { $dateTrunc: { date: "$createdAt", unit: "day" } }, 
                    // dateTrunc окрулгение даты до нужной еденицы 
                    // тоесть сейчас вернет дату только с днем без часов сек тд
                    value: {$sum: 1} // добовляем +1 за каждого пользователя
                }
            },
            {
                $project: {
                    _id: 0,
                    createdAt: '$_id',
                    value: 1
                }
            },
            {
                $sort: {createdAt: 1}
            },
            {
                $facet: { // $facet делает несколько веток
                    day: [{$match: {createdAt: { $gte: dateDay }}}],
                    week: [{$match: {createdAt: { $gte: dateWeek }}}],
                    month: []
                }
            }
        ])
        return countUser[0]
    }
    
    async updateBalance (id:string, balance:number, balanceType:string) {
        const amount = Number(balance)
        const updateBalnce = await UserModel.findByIdAndUpdate(
            id,
            { $inc: { balance: balanceType === 'Deposit' ? amount : -amount } },
            { returnDocument: 'after' } 
        );
        if(!updateBalnce) throw new BadRequestException('UpateBalanceError')
        await this.financeService.createTransaction(balance, id, balanceType)
        return {balance:updateBalnce.balance}
    }

    async changeStatusLotAfterBlock(id:string, status:string) {
        try {
            const isBlocked = status === 'Blocked' || status === 'Temporary'

            await LotModel.updateMany(
                isBlocked
                    ? { author: id }
                    : { author: id, status: 'Blocked' },
                {
                    $set: {
                    status: isBlocked ? 'Blocked' : 'Archive'
                    }
                }
            )

        } catch (error) {
            throw error
        }
    }

    async changeStatus (id:string) {
        const user = await UserModel.findById(id)
        if(!user) {
            throw new BadRequestException('UserNotFound')
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $set: { status: user.status === 'Blocked' ? 'No restrictions' : 'Blocked' } },
            { returnDocument: 'after' } 
        );
        
        if (!updatedUser) {
            throw new BadRequestException('UserNotFound');
        }

        await this.changeStatusLotAfterBlock(id, updatedUser.status)

        return {status:updatedUser.status}
    }

    async TemporaryBlock(id:string, day:number) {
        const user = await UserModel.findById(id)
        if(!user) {
            throw new BadRequestException('UserNotFound')
        }

        const now = new Date()
        now.setDate(now.getDate() + (Number(day) || 7))

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                $set: 
                {
                    status: user.status === 'Temporary' ? 'No restrictions' : 'Temporary',
                    UnblockDate: user.status === 'Temporary' ? null : now
                }
            },
            { returnDocument: 'after' }
        )
        if (!updatedUser) {
            throw new BadRequestException('UserNotFound');
        }

        await this.changeStatusLotAfterBlock(id, updatedUser.status)

        return {status:updatedUser.status, unBlockDate: updatedUser.UnblockDate}
    }
    

    async deleteUser(id:string) {
        try {
          const deletedUser = await UserModel.findByIdAndDelete(id);
            if (!deletedUser) {
                throw new BadRequestException('UserNotFound');
            }
            return { success: true };
        } catch (error) {
            console.log('error delete user', error)
            throw new BadRequestException('ErrorDeleteUser')
        }
    }

}