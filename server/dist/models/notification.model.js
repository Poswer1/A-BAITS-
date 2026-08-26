"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    to: { type: String, required: true },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    notification: { type: String, required: true },
    lot: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Lot' },
    read: { type: Boolean, default: false }
}, { timestamps: true });
exports.NotificationModel = (0, mongoose_1.model)('Notification', NotificationSchema);
//# sourceMappingURL=notification.model.js.map