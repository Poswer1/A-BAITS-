"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const lot_model_1 = require("../../models/lot.model");
const user_model_1 = require("../../models/user.model");
let FavoritesService = class FavoritesService {
    async addFavorite(lotId, userId) {
        const user = await user_model_1.UserModel.findById(userId);
        const exist = user?.favorites.some(fav => fav.toString() === lotId);
        if (exist) {
            await user_model_1.UserModel.findByIdAndUpdate(userId, { $pull: { favorites: lotId } });
            await lot_model_1.LotModel.findByIdAndUpdate(lotId, { $inc: { favoritesCount: -1 } });
            return { success: false };
        }
        await user_model_1.UserModel.findByIdAndUpdate(userId, { $addToSet: { favorites: lotId } });
        await lot_model_1.LotModel.findByIdAndUpdate(lotId, { $inc: { favoritesCount: +1 } });
        return { success: true };
    }
    async getFavorite(userId) {
        const user = await user_model_1.UserModel.findById(userId).select('favorites');
        if (!user) {
            console.log('пользователь не найден при получении списка избранных');
            return [];
        }
        return user.favorites;
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)()
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map