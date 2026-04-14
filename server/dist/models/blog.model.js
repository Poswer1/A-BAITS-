"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    images: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    descriptions: { type: String, required: true }
}, { timestamps: true });
exports.BlogModel = (0, mongoose_1.model)('Blog', BlogSchema);
//# sourceMappingURL=blog.model.js.map