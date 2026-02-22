"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    role: { type: String, required: true },
    avatar: { type: String, default: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid&w=740&q=80' },
}, { timestamps: true, });
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.model.js.map