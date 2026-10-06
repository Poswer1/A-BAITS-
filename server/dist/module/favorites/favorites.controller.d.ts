import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    addFavorite(id: string, userId: string): Promise<{
        success: boolean;
    }>;
    getFavorite(userId: string): Promise<import("mongoose").Types.ObjectId[]>;
}
