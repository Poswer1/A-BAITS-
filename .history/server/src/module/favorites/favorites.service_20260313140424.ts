import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class FavoritesService {
    async addFavorite(id:string, userId:string) {
        const user = await UserModel.findById(userId)
        if(!user) {
            console.log('пользователь не найден при добовление в избранное')
            return
        }

       
        if(!user.favorites.includes(id)) {
            user.favorites.push(new Types.ObjectId(id))
            await user.save()
        } else {
            user.favorites.delete(id)
        }

    }
}
