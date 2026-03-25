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
const user_model_1 = require("../../models/user.model");
let LotService = class LotService {
    async createLot(dto, files, userId) {
        const images = files ? await (0, files_upload_1.ProccessImages)(files, '/uploads/lots/') : [];
        const Nlot = Math.floor(10000000 + Math.random() * 90000000).toString();
        const nowDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const newDate = new Date(nowDate.getTime() + (oneDay * Number(dto.date)));
        if (dto.dateTime) {
            const [hours, minutes] = dto.dateTime.split(':').map(Number);
            newDate.setHours(hours, minutes, 0, 0);
        }
        try {
            const product = await lot_model_1.LotModel.create({
                ...dto,
                author: userId,
                images,
                date: newDate,
                dateTime: dto.dateTime,
                lotNumber: Nlot
            });
            return product;
        }
        catch (error) {
            throw new common_1.BadRequestException('Не вдалося створити товар', error.message);
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
    async getLotByUser(query) {
        const { name, page } = query;
        const user = await user_model_1.UserModel.findOne({ name: name });
        if (!user) {
            console.log('пользователь не найден при получени товаров по именни');
            return;
        }
        const limit = 4;
        const currentPage = Number(page) || 1;
        const [allLots, totalLots] = await Promise.all([
            await lot_model_1.LotModel.find({ author: user._id })
                .limit(limit)
                .skip((currentPage - 1) * limit),
            await lot_model_1.LotModel.countDocuments({ author: user._id })
        ]);
        return { allLots, totalLots };
    }
    async getMyLots(query, userId) {
        const { status, mode, page } = query;
        let filter = {};
        const currentPage = Number(page) || 1;
        const limit = 4;
        if (mode === 'sell') {
            filter.author = userId;
            if (status)
                filter.status = status;
        }
        else {
            if (status === 'Active') {
                filter['historyBid.author'] = userId;
                filter.status = 'Active';
            }
            if (status === 'Archive') {
                filter['historyBid.author'] = userId;
                filter.status = 'Archive';
            }
            if (status === 'Completed') {
                filter.winner = userId;
                filter.status = 'Completed';
            }
            if (status === 'Sold') {
                filter.winner = { $ne: userId };
                filter.status = 'Completed';
            }
            if (status === 'Favorite') {
                const user = await user_model_1.UserModel.findById(userId)
                    .select('favorites');
                if (user?.favorites?.length) {
                    filter._id = { $in: user.favorites };
                }
                else {
                    filter._id = { $in: [] };
                }
            }
        }
        const [allLots, totalLot] = await Promise.all([
            lot_model_1.LotModel.find(filter)
                .collation({ locale: 'en', strength: 2 })
                .limit(limit)
                .skip((currentPage - 1) * limit),
            lot_model_1.LotModel.countDocuments(filter)
                .collation({ locale: 'en', strength: 2 }),
        ]);
        return { allLots, totalLot };
    }
    async getFilterLot(query) {
        const { category, subCategory, subSubCategory, city, minPrice, maxPrice, state, sort, search } = query;
        let filter = {};
        const min = Number(minPrice);
        const max = Number(maxPrice);
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = 10;
        let sortOption = { startPrice: 'asc' };
        if (sort) {
            sortOption = sort === 'LowToUp' ? { startPrice: 'asc' } : { startPrice: 'desc' };
        }
        if (search)
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { lotNumber: search }
            ];
        if (category)
            filter.category = category;
        if (subCategory)
            filter.subCategory = subCategory;
        if (subSubCategory)
            filter.subSubCategory = subSubCategory;
        if (city)
            filter.location = city;
        if (min || max) {
            filter.startPrice = {
                ...(min ? { $gte: min } : {}),
                ...(max ? { $lte: max } : {})
            };
        }
        if (state) {
            const states = Array.isArray(state) ? state : [state];
            filter.state = {
                $in: states.map(s => s)
            };
        }
        const [lots, totalLot, maxLots] = await Promise.all([
            lot_model_1.LotModel.find(filter)
                .collation({ locale: 'en', strength: 2 })
                .sort(sortOption)
                .limit(limit)
                .skip((page - 1) * limit),
            lot_model_1.LotModel.countDocuments(filter)
                .collation({ locale: 'en', strength: 2 }),
            lot_model_1.LotModel.find(filter)
                .sort({ startPrice: 'desc' })
                .collation({ locale: 'en', strength: 2 })
                .limit(1)
        ]);
        const maxPriceLot = maxLots[0]?.startPrice || 0;
        return { lots, totalLot, maxPriceLot };
    }
    async getLot(numberLot) {
        const orQuery = [{ lotNumber: numberLot }];
        if ((0, mongoose_1.isValidObjectId)(numberLot)) {
            orQuery.push({ _id: new mongoose_1.Types.ObjectId(numberLot) });
        }
        try {
            const lot = await lot_model_1.LotModel.findOne({ $or: orQuery }).populate('author', 'avatar name rating');
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
        try {
            const lot = await lot_model_1.LotModel.findOne({ lotNumber: data.lotId });
            if (!lot) {
                throw new common_1.BadRequestException('lotNotFound');
            }
            if (lot.winner) {
                throw new common_1.BadRequestException('LotAlreadySold');
            }
            const minBid = lot.startPrice + lot.stepPrice;
            if (data.bid < minBid) {
                throw new common_1.BadRequestException(`Минимальная ставка ${minBid}`);
            }
            const user = await user_model_1.UserModel.findById(userId);
            if (!user) {
                throw new common_1.BadRequestException('UserNotFound');
            }
            if (user.balance < data.bid) {
                throw new common_1.BadRequestException('NoMoney');
            }
            const nowDate = new Date();
            const differenceDate = lot.date.getTime() - nowDate.getTime();
            const fiveMinutes = 300000;
            const update = await lot_model_1.LotModel.updateOne({
                _id: lot._id,
                winner: { $exists: false },
                startPrice: lot.startPrice
            }, {
                $set: {
                    startPrice: data.bid,
                    ...(differenceDate <= fiveMinutes && {
                        date: new Date(lot.date.getTime() + fiveMinutes)
                    })
                },
                $push: {
                    historyBid: {
                        author: new mongoose_1.Types.ObjectId(userId),
                        currentBid: data.bid
                    }
                }
            });
            if (update.modifiedCount === 0) {
                throw new common_1.BadRequestException('Ставка уже перебита');
            }
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
                lotId: updateLot.lotNumber,
                newPrice: updateLot.startPrice,
                lastBid: lastBid
            };
        }
        catch (error) {
            throw error;
        }
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