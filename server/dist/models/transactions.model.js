"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    sum: { type: Number, required: true },
    type: { type: String, required: true },
    status: { type: String, required: false, default: 'Approved' },
    lot: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Lot', required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
exports.TransactionModel = (0, mongoose_1.model)('transaction', TransactionSchema);
//# sourceMappingURL=transactions.model.js.map