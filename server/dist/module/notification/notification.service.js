"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const lot_model_1 = require("../../models/lot.model");
const notification_model_1 = require("../../models/notification.model");
let NotificationService = class NotificationService {
    async getHistoryNotification(userId) {
        const notifications = await notification_model_1.NotificationModel.find({ to: userId })
            .sort({ createdAt: -1 })
            .populate('lot', 'name lotNumber')
            .populate('from', 'name avatar');
        if (!notifications)
            return [];
        return notifications;
    }
    async read(userId) {
        await notification_model_1.NotificationModel.updateMany({ to: userId, read: false }, { $set: { read: true } });
        return;
    }
    async checkRead(userId) {
        const notification = await notification_model_1.NotificationModel.find({ to: userId });
        return notification.some((n) => !n.read);
    }
    async removeChatNotifications(to, lotId) {
        await notification_model_1.NotificationModel.deleteMany({
            to,
            lot: lotId,
            notification: 'newChatMessage',
        });
    }
    async createNotification(to, notification, lotId, from) {
        const lot = await lot_model_1.LotModel.findById(lotId);
        if (!lot) {
            console.log('лот не найден при отправке уведомления');
            return;
        }
        try {
            const newNotification = notification === 'newChatMessage'
                ? await notification_model_1.NotificationModel.findOneAndUpdate({ to, lot: lot._id, notification }, {
                    $set: {
                        ...(from && { from: new mongoose_1.Types.ObjectId(from) }),
                        read: false,
                    },
                }, { new: true, upsert: true, setDefaultsOnInsert: true })
                : await notification_model_1.NotificationModel.create({
                    to,
                    ...(from && { from: new mongoose_1.Types.ObjectId(from) }),
                    notification,
                    lot: lot._id,
                    read: false
                });
            if (!newNotification)
                return null;
            await newNotification.populate('lot', 'name lotNumber');
            await newNotification.populate('from', 'name avatar');
            return newNotification;
        }
        catch (error) {
            console.log('ошибка отправки уведомления', error);
            return null;
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
//# sourceMappingURL=notification.service.js.map