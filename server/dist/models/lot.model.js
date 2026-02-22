"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotModel = void 0;
const mongoose_1 = require("mongoose");
const HistoryBidSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    currentBid: { type: Number, required: true }
}, { timestamps: true, });
const LotSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    lotNumber: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    subSubCategory: { type: String, default: null },
    startPrice: { type: Number, required: true },
    stepPrice: { type: Number, required: true },
    blitzPrice: { type: Number },
    reservPrice: { type: Number },
    images: { type: [String], required: true },
    autoReExtension: { type: Boolean, default: false },
    descriptions: { type: String, required: true },
    state: { type: String, required: true },
    status: { type: String, default: 'active' },
    date: { type: Number, required: true },
    dateTime: { type: String, default: '21:00' },
    location: { type: String, required: true },
    delivary: { type: String, required: true },
    historyBid: { type: [HistoryBidSchema], default: [] },
    Advertising: { type: Boolean, default: false },
}, { timestamps: true, });
exports.LotModel = (0, mongoose_1.model)("Lot", LotSchema);
//# sourceMappingURL=lot.model.js.map