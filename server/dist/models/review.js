"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    lot: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Lot', required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
}, { timestamps: true });
ReviewSchema.index({ from: 1, to: 1, lot: 1 }, { unique: true });
exports.ReviewModel = (0, mongoose_1.model)('review', ReviewSchema);
//# sourceMappingURL=review.js.map