"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String },
    location: { type: String },
    city: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    role: { type: String, required: true },
    rating: { type: Number, default: 1 },
    favorites: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Lot' },
    avatar: { type: String, default: '/uploads/defaultAvatar/avatar1.webp' },
}, { timestamps: true, });
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.model.js.map