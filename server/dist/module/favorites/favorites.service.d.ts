import { Types } from 'mongoose';
export declare class FavoritesService {
    addFavorite(lotId: string, userId: string): Promise<{
        success: boolean;
    }>;
    getFavorite(userId: string): Promise<Types.ObjectId[]>;
}
