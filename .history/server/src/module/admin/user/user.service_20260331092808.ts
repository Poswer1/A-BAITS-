import { BadRequestException, Injectable } from "@nestjs/common";
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
        const date = new Date()
        date.setDate(date.getDate() - 30)
        const countUser = await UserModel.countDocuments({createdAt: {$gte: date}})
        return countUser
    }

    async getCountRegisteredUsers() {
        const dateDay = new Date()
        dateDay.setDate(dateDay.getDate() - 1)
        const dateWeek = new Date()
        dateWeek.setDate(dateWeek.getDate() - 7)
        const dateMonth = new Date()
        dateMonth.setDate(dateMonth.getDate() - 1)
        const countUser = await UserModel.aggregate([
            {
                $match: { // $match фильтр
                    createdAt: { $gte: dateMonth } // за последний месяц
                }
            },
            {
                $project: { // $project говорим что остовляем
                _id: 0, // 0 - убрать, 1 - оставить
                name:1,
                createdAt: 1
                    }
            },
            {
                $facet: { // $facet делает несколько веток
                    day: [],
                    week: []
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
            { returnDocument: 'after' } // вернёт уже обновлённого пользователя
        );

        if (!updatedUser) {
            throw new BadRequestException('UserNotFound');
        }
        return {status:updatedUser.status}
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