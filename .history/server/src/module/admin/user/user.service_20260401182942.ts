import { BadRequestException, Injectable } from "@nestjs/common";
import { now } from "mongoose";
import { UserModel } from "src/models/user.model";

@Injectable()
export class UserService {

    async getAllUser () {
        try {
            const listUser = await UserModel.find({})
            return listUser
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
    
    async updateBalance (id:string, balance:number) {
        const updateBalnce = await UserModel.findByIdAndUpdate(
            id,
            { $inc: { balance: balance } },
            { returnDocument: 'after' } 
        );
        if(!updateBalnce) throw new BadRequestException('UpateBalanceError')
        return {balance:updateBalnce.balance}
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
        return {status:updatedUser.status, unBlockDate: up}
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