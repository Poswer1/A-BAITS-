"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotsService = void 0;
const common_1 = require("@nestjs/common");
const lot_model_1 = require("../../../models/lot.model");
let LotsService = class LotsService {
    getDateRanges() {
        const now = new Date();
        const dateDay = new Date(now);
        dateDay.setDate(now.getDate() - 1);
        const dateWeek = new Date(now);
        dateWeek.setDate(now.getDate() - 7);
        const dateMonth = new Date(now);
        dateMonth.setDate(now.getDate() - 30);
        return { dateDay, dateWeek, dateMonth };
    }
    ;
    async getLotsBySearch(search) {
        console.log(search);
        const allLots = await lot_model_1.LotModel.find({
            name: { $regex: search, $options: 'i' }
        });
        return allLots;
    }
    async closeLot(id) {
        const close = await lot_model_1.LotModel.findByIdAndUpdate(id, {
            $set: { status: 'Archive' }
        });
        if (!close)
            throw new common_1.BadRequestException('errorCloseLot');
        return { status: close.status };
    }
    async getLotsCount() {
        const { dateDay, dateWeek, dateMonth } = this.getDateRanges();
        const lotsCount = await lot_model_1.LotModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: dateMonth }
                }
            },
            {
                $group: {
                    _id: { $dateTrunc: { date: "$createdAt", unit: "day" } },
                    value: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    createdAt: "$_id",
                    value: 1
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            },
            {
                $facet: {
                    day: [{ $match: { createdAt: { $gte: dateDay } } }],
                    week: [{ $match: { createdAt: { $gte: dateWeek } } }],
                    month: []
                }
            }
        ]);
        return lotsCount[0];
    }
    async getAllTurnover() {
        const { dateDay, dateWeek, dateMonth } = this.getDateRanges();
        const allTurnover = await lot_model_1.LotModel.aggregate([
            {
                $match: {
                    status: 'Completed',
                    winner: { $exists: true },
                    createdAt: { $gte: dateMonth }
                }
            },
            {
                $project: {
                    _id: 0,
                    value: '$startPrice',
                    createdAt: 1
                }
            },
            {
                $sort: { createdAt: 1 }
            },
            {
                $facet: {
                    day: [
                        { $match: { createdAt: { $gte: dateDay } } }
                    ],
                    week: [
                        { $match: { createdAt: { $gte: dateWeek } } }
                    ],
                    month: []
                }
            }
        ]);
        return allTurnover[0];
    }
};
exports.LotsService = LotsService;
exports.LotsService = LotsService = __decorate([
    (0, common_1.Injectable)()
], LotsService);
//# sourceMappingURL=lots.service.js.map