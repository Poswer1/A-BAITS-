import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { LotModel } from 'src/models/lot.model';
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
        await LotModel.findByIdAndUpdate(
            lotId,
            {$inc: {favoritesCount: - 1}}
        )
        return {success:false}
    }

    await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { favorites: lotId } }, // $addToSet сохранить
    );
    await LotModel.findByIdAndUpdate(
            lotId,
            {$inc: {favoritesCount: + 1}}
        )
    
    return {success:true}
    }

    async getFavorite(userId:string) {
        const user = await UserModel.findById(userId).select('favorites')
        if(!user) {
            console.log('пользователь не найден при получении списка избранных')
            return []
        }

        return user.favorites
    }
}
