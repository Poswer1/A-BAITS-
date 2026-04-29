"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotModel = void 0;
const mongoose_1 = require("mongoose");
const AutoBidSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    max: { type: Number, required: true }
});
const HistoryBidSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    currentBid: { type: Number, required: true }
}, { timestamps: true, });
const LotSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    lotNumber: { type: String },
    category: { type: String, required: true },
    subCategory: { type: String },
    subSubCategory: { type: String, default: null },
    startPrice: { type: Number, required: true },
    stepPrice: { type: Number, required: true },
    blitzPrice: { type: Number },
    favoritesCount: { type: Number, default: 0 },
    views: { type: [String] },
    images: { type: [String], required: true },
    autoReExtension: { type: Boolean, default: false },
    descriptions: { type: String, required: true },
    state: { type: String, required: true },
    status: { type: String, default: 'Active' },
    date: { type: Date, required: true },
    dateTime: { type: String, default: '21:00' },
    location: { type: String, required: true },
    delivary: { type: [String], required: true },
    historyBid: { type: [HistoryBidSchema], default: [] },
    autoBid: { type: [AutoBidSchema], default: [] },
    Advertising: { type: Boolean, default: false },
    winner: { type: mongoose_1.Types.ObjectId, ref: 'User' },
}, { timestamps: true, });
exports.LotModel = (0, mongoose_1.model)("Lot", LotSchema);
//# sourceMappingURL=lot.model.js.map