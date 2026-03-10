"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    userFrom: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    userTo: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, default: 'default' },
    lot: { type: String },
    status: { type: String, default: 'Active' },
    reviews: [{
            from: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            to: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
        }],
    messages: [{
            from: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            to: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            message: { type: String, required: true },
            read: { type: Boolean, default: false },
            createdAt: { type: Date, default: new Date() }
        }],
}, { timestamps: true });
exports.ChatModel = (0, mongoose_1.model)("Chat", ChatSchema);
//# sourceMappingURL=chat.model.js.map