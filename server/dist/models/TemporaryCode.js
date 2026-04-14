"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempoparyCode = void 0;
const mongoose_1 = require("mongoose");
const TempoparyCodeSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    code: { type: String, required: true }
}, { timestamps: true });
exports.TempoparyCode = (0, mongoose_1.model)('TempoparyCode', TempoparyCodeSchema);
//# sourceMappingURL=TemporaryCode.js.map