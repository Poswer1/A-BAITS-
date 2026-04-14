"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViolationsModel = void 0;
const mongoose_1 = require("mongoose");
const ViolationsSchema = new mongoose_1.Schema({
    violations: { type: String, required: true },
    lot: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lot", required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    repeated: { type: Number, required: true },
}, { timestamps: true });
exports.ViolationsModel = (0, mongoose_1.model)('Violations', ViolationsSchema);
//# sourceMappingURL=violations.js.map