"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const chat_model_1 = require("../../models/chat.model");
const review_1 = require("../../models/review");
const lot_model_1 = require("../../models/lot.model");
const notification_gateway_1 = require("../notification/notification.gateway");
let ChatCronService = class ChatCronService {
    notificationGateWay;
    constructor(notificationGateWay) {
        this.notificationGateWay = notificationGateWay;
    }
    async checkStaleChats() {
        try {
            const now = new Date();
            const threshold = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
            const staleChats = await chat_model_1.ChatModel.find({
                status: 'Active',
                createdAt: { $lte: threshold }
            });
            if (staleChats.length === 0)
                return;
            for (const chat of staleChats) {
                try {
                    const reviewCount = await review_1.ReviewModel.countDocuments({
                        lot: chat.lot,
                        from: { $in: chat.users },
                        to: { $in: chat.users }
                    });
                    if (reviewCount > 0)
                        continue;
                    chat.status = 'Close';
                    await chat.save();
                    await lot_model_1.LotModel.findByIdAndUpdate(chat.lot, {
                        status: 'Archive'
                    });
                    await this.notificationGateWay.sendNotification({
                        to: chat.users[0].toString(),
                        notification: 'chatClosedByTimeout',
                        lotId: chat.lot.toString(),
                    });
                    await this.notificationGateWay.sendNotification({
                        to: chat.users[1].toString(),
                        notification: 'chatClosedByTimeout',
                        lotId: chat.lot.toString(),
                    });
                    console.log(`Chat ${chat._id} closed after 14 days without reviews`);
                }
                catch (error) {
                    console.error('Chat cron error for chat', chat._id, error);
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ChatCronService = ChatCronService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatCronService.prototype, "checkStaleChats", null);
exports.ChatCronService = ChatCronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway])
], ChatCronService);
//# sourceMappingURL=chat-cron.service.js.map