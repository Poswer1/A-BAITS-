"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    type: { type: String, default: 'default' },
    lot: { type: mongoose_1.Schema.Types.ObjectId, ref: "Lot", },
    status: { type: String, default: 'Active' },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{
            from: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            to: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
            message: { type: String, required: true },
            status: { type: String, default: 'user' },
            createdAt: { type: Date, default: new Date() }
        }],
}, { timestamps: true });
exports.ChatModel = (0, mongoose_1.model)("Chat", ChatSchema);
//# sourceMappingURL=chat.model.js.map