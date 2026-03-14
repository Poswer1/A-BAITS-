import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class FavoritesService {
    async addFavorite(id:string, userId:string) {
        await UserModel.findByIdAndUpdate(
            user
        )
    }
}
