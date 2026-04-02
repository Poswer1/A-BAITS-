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
    
    async updateBalance (id:string, balance:number) {
        const updateBalnce = await UserModel.findByIdAndUpdate(
            id,
            { $set: { balance: 0 } },
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