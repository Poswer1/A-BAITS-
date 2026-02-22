"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotModel = void 0;
const mongoose_1 = require("mongoose");
const LotSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    startPrice: { type: Number, required: true },
    stepPrice: { type: Number, required: true },
    blitzPrice: { type: Number },
    reservPrice: { type: Number },
    img: { type: [String], required: true },
    autoReExtension: { type: Boolean, default: false },
    descriptions: { type: String, required: true },
    state: { type: String, required: true },
    date: { type: Date, required: true },
    dateTime: { type: Number, required: true },
    location: { type: String, required: true },
    delivary: { type: String, required: true },
    Advertising: { type: Boolean, default: false },
});
exports.LotModel = (0, mongoose_1.model)("Lot", LotSchema);
//# sourceMappingURL=lot.modal.js.map