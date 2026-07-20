"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesMessageModel = void 0;
const mongoose_1 = require("mongoose");
const TemplatesMessageSchema = new mongoose_1.Schema({
    subject: { type: String, required: true },
    html: { type: String, required: true },
}, { timestamps: true });
exports.TemplatesMessageModel = (0, mongoose_1.model)('TemplatesMessage', TemplatesMessageSchema);
//# sourceMappingURL=templatesMessage.js.map