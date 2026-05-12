"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotService = void 0;
const common_1 = require("@nestjs/common");
const lot_model_1 = require("../../models/lot.model");
const files_upload_1 = require("../../utils/files-upload");
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = require("../../models/user.model");
const violations_service_1 = require("../admin/violations/violations.service");
const finance_service_1 = require("../admin/finance/finance.service");
const logging_service_1 = require("../admin/logging/logging.service");
let LotService = class LotService {
    violationsService;
    financeService;
    loggingService;
    constructor(violationsService, financeService, loggingService) {
        this.violationsService = violationsService;
        this.financeService = financeService;
        this.loggingService = loggingService;
    }
    async createLot(dto, files, userId) {
        const delivary = Array.isArray(dto.delivary)
            ? dto.delivary
            : dto.delivary
                ? [dto.delivary]
                : [];
        const images = files ? await (0, files_upload_1.ProccessImages)(files, '/uploads/lots/') : [];
        const Nlot = Math.floor(10000000 + Math.random() * 90000000).toString();
        const nowDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const newDate = new Date(nowDate.getTime() + (oneDay * Number(dto.date)));
        if (dto.dateTime) {
            const [hours, minutes] = dto.dateTime.split(':').map(Number);
            newDate.setHours(hours, minutes, 0, 0);
        }
        const user = await user_model_1.UserModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('UserNotFound');
        if (user.balance <= -1)
            throw new common_1.BadRequestException('balanceInTheRed');
        let summaryPrice = 0;
        if (dto.Advertising) {
            summaryPrice += 20;
        }
        const session = await mongoose_1.default.startSession();
        try {
            session.startTransaction();
            if (summaryPrice > 0) {
                const userUpdate = await user_model_1.UserModel.updateOne({
                    _id: userId,
                    status: 'No restrictions',
                    balance: { $gte: summaryPrice },
                }, {
                    $inc: { balance: -summaryPrice }
                }, { session });
                if (userUpdate.modifiedCount === 0) {
                    throw new Error('NoMoney');
                }
            }
            const [product] = await lot_model_1.LotModel.create([
                {
                    ...dto,
                    author: userId,
                    delivary: delivary,
                    images,
                    date: newDate,
                    dateTime: dto.dateTime,
                    lotNumber: Nlot
                }
            ], { session });
            await session.commitTransaction();
            try {
                if (summaryPrice > 0) {
                    await this.financeService.createTransaction(summaryPrice, userId, 'Debit', product._id.toString());
                }
                await this.loggingService.newLog(userId, 'createLot', product._id.toString());
            }
            catch (externalError) {
                console.error('Ошибка внешних операций:', externalError);
            }
            return product;
        }
        catch (error) {
            await session.abortTransaction();
            console.log(error);
            if (error.message === 'NoMoney') {
                throw new common_1.BadRequestException('NoMoney');
            }
            throw new common_1.BadRequestException('ErrorCreate');
        }
        finally {
            session.endSession();
        }
    }
    async closeLot(id) {
        const close = await lot_model_1.LotModel.findByIdAndUpdate(id, {
            $set: { status: 'Archive' }
        });
        if (!close)
            throw new common_1.BadRequestException('errorCloseLot');
        return { status: close.status };
    }
    async resumeLot(id) {
        const lot = await lot_model_1.LotModel.findById(id);
        if (!lot)
            throw new common_1.BadRequestException('LotNotFound');
        const diffDays = Math.floor((lot.date.getTime() - lot.createdAt.getTime()));
        const nowDate = new Date();
        const newDate = new Date(nowDate.getTime() + diffDays);
        newDate.setHours(lot.date.getHours(), lot.date.getMinutes(), 0, 0);
        try {
            await lot_model_1.LotModel.findByIdAndUpdate(id, {
                $set: {
                    status: 'Active',
                    date: newDate
                }
            });
            return { success: true };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteLot(id) {
        try {
            await lot_model_1.LotModel.findByIdAndDelete(id);
            return { success: true };
        }
        catch (error) {
            throw error;
        }
    }
    async updateLot(dto, id, files, preview, userId, role) {
        const lot = await lot_model_1.LotModel.findOne({
            lotNumber: id,
        });
        if (!lot)
            throw new common_1.BadRequestException('LotNotFound');
        if ((lot?.historyBid?.length ?? 0) > 0 && role !== 'admin')
            throw new common_1.BadRequestException('LotAlreadyHaveBids');
        const newImages = files ? await (0, files_upload_1.ProccessImages)(files, '/uploads/lots/') : [];
        const existingImages = preview || [];
        let updatedImages = existingImages;
        if (newImages && newImages.length > 0) {
            updatedImages = [...existingImages, ...newImages];
        }
        const nowDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const newDate = new Date(nowDate.getTime() + (oneDay * dto.date));
        if (dto.dateTime) {
            const [hours, minutes] = dto.dateTime.split(':').map(Number);
            newDate.setHours(hours, minutes, 0, 0);
        }
        const updateLot = await lot_model_1.LotModel.findOneAndUpdate({
            lotNumber: id,
            author: userId
        }, {
            ...dto,
            date: newDate,
            images: updatedImages
        });
        if (!updateLot)
            throw new common_1.BadRequestException('ErrorUpdateLot');
        return { success: true };
    }
    async viewsCount(id, userId) {
        try {
            await lot_model_1.LotModel.updateOne({ _id: id }, { $addToSet: { views: userId } });
            return { success: true };
        }
        catch (error) {
            throw error;
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
    async getTopLot() {
        try {
            const lot = await lot_model_1.LotModel.aggregate([
                { $match: { status: 'Active', Advertising: { $eq: true } } },
                { $sample: { size: 4 } }
            ]);
            return lot;
        }
        catch (error) {
            throw new common_1.BadRequestException('topLotErrorFound');
        }
    }
    async getLotFrom1UAH() {
        try {
            const lot = await lot_model_1.LotModel.aggregate([
                { $match: { status: 'Active', startPrice: 1 } },
                { $sample: { size: 4 } }
            ]);
            return lot;
        }
        catch (error) {
            throw new common_1.BadRequestException('topLotErrorFound');
        }
    }
    async getNewLot() {
        try {
            const now = new Date();
            const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const lot = await lot_model_1.LotModel.aggregate([
                { $match: { status: 'Active', createdAt: { $gte: oneDayAgo } } },
                { $sample: { size: 4 } }
            ]);
            return lot;
        }
        catch (error) {
            throw new common_1.BadRequestException('topLotErrorFound');
        }
    }
    async getPopularLot() {
        try {
            const lot = await lot_model_1.LotModel.aggregate([
                {
                    $match: { status: 'Active' }
                },
                {
                    $addFields: {
                        viewsCount: { $size: { $ifNull: ['$views', []] } }
                    }
                },
                {
                    $sort: { favoritesCount: -1, viewsCount: -1 }
                },
                { $limit: 4 }
            ]);
            return lot;
        }
        catch (error) {
            throw new common_1.BadRequestException('topLotErrorFound');
        }
    }
    async getLotByUser(query) {
        const { name, page } = query;
        const user = await user_model_1.UserModel.findOne({ name: name });
        if (!user) {
            console.log('пользователь не найден при получени товаров по именни');
            return;
        }
        const limit = 10;
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
        const { status, mode, page, sort } = query;
        let filter = {};
        const currentPage = Number(page) || 1;
        const limit = 10;
        if (sort === 'MostBids') {
            filter.historyBid;
        }
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
                filter['historyBid.author'] = userId;
                filter.winner = { $ne: userId };
                filter.status = 'Sold';
            }
            if (status === 'Sold') {
                filter.winner = userId;
                filter.status = 'Sold';
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
        let sortOption = {};
        if (sort === 'Newest') {
            sortOption.createdAt = -1;
        }
        if (sort === 'Oldest') {
            sortOption.createdAt = 1;
        }
        if (sort === 'PriceHigh') {
            sortOption.startPrice = -1;
        }
        if (sort === 'PriceLow') {
            sortOption.startPrice = 1;
        }
        const [allLots, totalLot] = await Promise.all([
            lot_model_1.LotModel.find(filter)
                .sort(sortOption)
                .collation({ locale: 'en', strength: 2 })
                .limit(limit)
                .skip((currentPage - 1) * limit),
            lot_model_1.LotModel.countDocuments(filter)
                .collation({ locale: 'en', strength: 2 }),
        ]);
        if (sort === 'MostBids') {
            allLots.sort((a, b) => b.historyBid.length - a.historyBid.length);
        }
        if (sort === 'LeastBids') {
            allLots.sort((a, b) => a.historyBid.length - b.historyBid.length);
        }
        return { allLots, totalLot };
    }
    async getFilterLot(query) {
        const { category, subCategory, subSubCategory, city, minPrice, maxPrice, state, sort, search } = query;
        let filter = {
            status: 'Active'
        };
        const min = Number(minPrice);
        const max = Number(maxPrice);
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = 25;
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
    async getMyAutoBid(numberLot, userId) {
        const lot = await lot_model_1.LotModel.findOne({ lotNumber: numberLot }).select('autoBid');
        if (!lot)
            throw new common_1.BadRequestException('lotNotFound');
        const myAutoBids = lot.autoBid.filter(bid => bid.author.toString() === userId.toString());
        const max = myAutoBids.reduce((highest, bid) => Math.max(highest, bid.max), 0);
        return { max: max || null };
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
    async autoBid(data, userId) {
        const lot = await lot_model_1.LotModel.findOne({ lotNumber: data.lotId });
        if (!lot)
            throw new common_1.BadRequestException('lotNotFound');
        if (lot.author.toString() === userId.toString())
            throw new common_1.BadRequestException('bidYourself');
        const minBid = lot.startPrice + lot.stepPrice;
        if (data.bid < minBid)
            throw new common_1.BadRequestException(`Минимальная ставка ${minBid}`);
        const user = await user_model_1.UserModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('UserNotFound');
        if (user.balance <= -1)
            throw new common_1.BadRequestException('NoMoney');
        const { authorBid, newPrice } = await this.calculateAuctionState(lot.autoBid, userId, data.bid, lot.stepPrice, lot.startPrice, 'autoBid');
        const update = await lot_model_1.LotModel.updateOne({
            lotNumber: data.lotId,
            winner: { $exists: false }
        }, {
            startPrice: newPrice,
            $push: {
                autoBid: {
                    author: userId,
                    max: data.bid
                },
                historyBid: {
                    author: authorBid,
                    currentBid: newPrice
                }
            }
        });
        if (update.modifiedCount === 0)
            throw new common_1.BadRequestException('errorAutoBid');
        const updateLot = await lot_model_1.LotModel.findById(lot._id);
        if (!updateLot)
            throw new common_1.BadRequestException('lotNotFound');
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
    async placeBid(data, userId) {
        try {
            const lot = await lot_model_1.LotModel.findOne({ lotNumber: data.lotId });
            if (!lot)
                throw new common_1.BadRequestException('lotNotFound');
            if (lot.winner)
                throw new common_1.BadRequestException('LotAlreadySold');
            if (lot.author.toString() === userId.toString())
                throw new common_1.BadRequestException('bidYourself');
            const minBid = lot.startPrice + lot.stepPrice;
            if (data.bid < minBid) {
                throw new common_1.BadRequestException(`Минимальная ставка ${minBid}`);
            }
            const user = await user_model_1.UserModel.findById(userId);
            if (!user)
                throw new common_1.BadRequestException('UserNotFound');
            if (user.balance <= -1)
                throw new common_1.BadRequestException('NoMoney');
            const { authorBid, newPrice } = await this.calculateAuctionState(lot.autoBid, userId, data.bid, lot.stepPrice, lot.startPrice, 'default');
            const nowDate = new Date();
            const differenceDate = lot.date.getTime() - nowDate.getTime();
            const fiveMinutes = 300000;
            const update = await lot_model_1.LotModel.updateOne({
                _id: lot._id,
                winner: { $exists: false },
                startPrice: lot.startPrice
            }, {
                $set: {
                    startPrice: newPrice,
                    ...(differenceDate <= fiveMinutes && {
                        date: new Date(lot.date.getTime() + fiveMinutes)
                    })
                },
                $push: {
                    historyBid: {
                        author: new mongoose_1.Types.ObjectId(authorBid),
                        currentBid: newPrice
                    }
                }
            });
            if (update.modifiedCount === 0)
                throw new common_1.BadRequestException('Ставка уже перебита');
            const updateLot = await lot_model_1.LotModel.findById(lot._id)
                .populate('historyBid.author', 'name avatar');
            const lastBidRaw = updateLot?.historyBid[updateLot.historyBid.length - 1];
            if (!lastBidRaw)
                return null;
            const userAuthor = await user_model_1.UserModel.findById(updateLot.author);
            if (!userAuthor)
                throw new common_1.BadRequestException('userAuthorNotfound');
            if (user.ip === userAuthor?.ip) {
                await this.violationsService.newViolations(user?._id.toString(), 'SelfBidding', updateLot?._id.toString());
            }
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
    async calculateAuctionState(lots, userId, bid, stepPrice, startPrice, mode) {
        const sorted = [...(lots ?? [])]
            .map((bid, index) => ({ ...bid, index }))
            .filter(x => typeof x.max === 'number')
            .sort((a, b) => b.max - a.max || a.index - b.index);
        const top1 = sorted[0];
        const top2 = sorted[1];
        const top1Max = top1?.max ?? 0;
        const top2Max = top2?.max ?? startPrice;
        if (!top1) {
            return {
                authorBid: userId,
                newPrice: mode === 'autoBid'
                    ? startPrice + stepPrice
                    : bid,
            };
        }
        if (mode === 'autoBid') {
            if (bid > top1Max) {
                return {
                    authorBid: userId,
                    newPrice: top1Max + stepPrice,
                };
            }
            const newPrice = Math.min(top1Max, Math.max(bid, top2Max) + stepPrice);
            return {
                authorBid: top1.author,
                newPrice,
            };
        }
        const highest = Math.max(bid, top2Max) + stepPrice;
        const newPrice = Math.min(top1Max, highest);
        return {
            authorBid: bid > top1Max ? userId : top1.author,
            newPrice,
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
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [violations_service_1.ViolationsService,
        finance_service_1.FinanceService,
        logging_service_1.LoggingService])
], LotService);
//# sourceMappingURL=lot.service.js.map
