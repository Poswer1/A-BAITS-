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

    async changeStatus (id:string) {
        const user = await UserModel.findById(id)
        if(!user) {
            throw new BadRequestException('UserNotFound')
        }
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $set: { status: user.status === 'Blocked' ? 'No restrictions' : 'Blocked' } },
            { new: true } // вернёт уже обновлённого пользователя
        );

        if (!updatedUser) {
            throw new BadRequestException('UserNotFound');
        }
        return {status:updatedUser.status}
    }

    async deleteUser(id:string) {
        await UserModel.findByIdAndDelete(
            
        )
    }

}