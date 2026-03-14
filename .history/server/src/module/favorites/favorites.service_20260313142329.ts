import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class FavoritesService {

    async addFavorite(lotId: string, userId: string) {

    const user = await UserModel.findById(userId);

    const exist = user?.favorites.some(
        fav => fav.toString() === lotId
    );

    if (exist) {
        await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { favorites: lotId } }, // pull удалить
            );
        return {success:false}
    }

        await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { favorites: lotId } }, // сохранить
        );
    
    return {success:true}
    }
}
