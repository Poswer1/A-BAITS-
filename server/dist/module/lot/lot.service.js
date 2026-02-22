"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotService = void 0;
const common_1 = require("@nestjs/common");
const lot_model_1 = require("../../models/lot.model");
const files_upload_1 = require("../../utils/files-upload");
const mongoose_1 = require("mongoose");
let LotService = class LotService {
    async createLot(dto, files, userId) {
        const images = files ? await (0, files_upload_1.ProccessImages)(files) : [];
        const Nlot = Math.floor(10000000 + Math.random() * 90000000).toString();
        try {
            const product = await lot_model_1.LotModel.create({
                ...dto,
                author: userId,
                images,
                lotNumber: Nlot
            });
            return product;
        }
        catch (error) {
            throw new common_1.BadRequestException('Не вдалося створити товар', error);
        }
    }
    async getAllLot() {
        try {
            const lot = await lot_model_1.LotModel.find({});
            return lot;
        }
        catch (error) {
            throw new common_1.BadRequestException('Ошибка при получение всех товаров', error);
        }
    }
    async getLot(numberLot) {
        try {
            const lot = await lot_model_1.LotModel.findOne({ lotNumber: numberLot }).populate('author', 'avatar name');
            return lot;
        }
        catch (error) {
            throw new common_1.BadRequestException('Ошибка при получение товара', error);
        }
    }
    async myHistoryLot(userId) {
        if (!userId)
            return;
        try {
            const myHistoryLot = await lot_model_1.LotModel.find({ 'historyBid.author': userId });
            return myHistoryLot;
        }
        catch (error) {
            throw new common_1.BadRequestException('Ошибка при получение истории лотов пользователя', error);
        }
    }
    async placeBid(data, userId) {
        const lot = await lot_model_1.LotModel.findOne({ lotNumber: data.lotId });
        if (!lot) {
            console.log('лот не найден');
            return;
        }
        const minBid = lot.startPrice + lot.stepPrice;
        if (data.bid < minBid) {
            console.log(`Минимальная ставка ${minBid}`);
            return;
        }
        lot.startPrice = data.bid;
        lot.historyBid.push({ author: new mongoose_1.Types.ObjectId(userId), currentBid: data.bid });
        await lot.save();
        const updateLot = await lot_model_1.LotModel.findById(lot._id)
            .populate('historyBid.author', 'name avatar');
        const lastBidRaw = updateLot?.historyBid[updateLot.historyBid.length - 1];
        if (!lastBidRaw)
            return null;
        const lastBid = {
            authorId: lastBidRaw.author._id,
            name: lastBidRaw.author.name,
            avatar: lastBidRaw.author.avatar,
            currentBid: lastBidRaw.currentBid,
            dateBid: lastBidRaw.createdAt
        };
        return {
            lotId: lot.lotNumber,
            newPrice: lot.startPrice,
            lastBid: lastBid
        };
    }
    async getHistoryBid(lotId) {
        const lot = await lot_model_1.LotModel.findOne({ lotNumber: lotId }).populate('historyBid.author', 'name avatar');
        if (!lot) {
            console.log('лот не найден при получение истории ставок');
            return { historyUser: [] };
        }
        const sortHistory = lot.historyBid.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
        const historyUser = sortHistory.map(bid => ({
            authorId: bid.author,
            name: bid.author.name,
            avatar: bid.author.avatar,
            currentBid: bid.currentBid,
            dateBid: bid.createdAt
        }));
        return { historyUser };
    }
};
exports.LotService = LotService;
exports.LotService = LotService = __decorate([
    (0, common_1.Injectable)()
], LotService);
//# sourceMappingURL=lot.service.js.map