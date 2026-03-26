import { Injectable } from "@nestjs/common";
import { UserModel } from "src/models/user.model";

@Injectable()
export class UserService {
    async getAllUser () {
        try {
            const listUser = await UserModel.find({})
            return listUser.length
        } catch (error) {
            
        }
    }
}