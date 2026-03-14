import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class FavoritesService {
    async addFavorite(id:string, userId:string) {
        const user = await UserModel.findById(userId)
        if(!user) {
            console.log('пользователь не найден при добовление в избранное')
            return
        }

        const exist = user.favorites.some(f => f.toString() === id)

        if(!exist) {
            user.favorites.push(new Types.ObjectId(id))
        } else {
            user.favorites.filter(f => f.toString() !== id)
        }

    }
}
