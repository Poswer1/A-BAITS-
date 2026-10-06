"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaggingModel = void 0;
const mongoose_1 = require("mongoose");
const LoaggingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    lot: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lot" },
    action: { type: String, required: true },
}, { timestamps: true });
exports.LoaggingModel = (0, mongoose_1.model)('Loagging', LoaggingSchema);
//# sourceMappingURL=logging.js.map