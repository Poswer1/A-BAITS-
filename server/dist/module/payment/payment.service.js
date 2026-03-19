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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const lot_model_1 = require("../../models/lot.model");
const user_model_1 = require("../../models/user.model");
const notification_gateway_1 = require("../notification/notification.gateway");
const chat_model_1 = require("../../models/chat.model");
let PaymentService = class PaymentService {
    notificationGateWay;
    constructor(notificationGateWay) {
        this.notificationGateWay = notificationGateWay;
    }
    async buyLot(userId, dto) {
        const { lotId, price } = dto;
        const lot = await lot_model_1.LotModel.findById(lotId);
        if (!lot) {
            console.log('лот не найден при покупки');
            return;
        }
        const user = await user_model_1.UserModel.findById(userId);
        if (!user) {
            console.log('пользователь не найден при покупки');
            return;
        }
        const lotPrice = price ?? lot.blitzPrice;
        if (!lotPrice)
            return;
        if (user.balance < lotPrice) {
            console.log('NoMoney');
            throw new common_1.BadRequestException('NoMoney');
        }
        const updateLot = await lot_model_1.LotModel.updateOne({ _id: lotId, winner: { $exists: false }, status: 'Active' }, { $set: { winner: userId, status: 'Completed' } });
        if (updateLot.modifiedCount === 0) {
            console.log('LotAlreadySold');
            throw new common_1.BadRequestException('LotAlreadySold');
        }
        const userUpdate = await user_model_1.UserModel.updateOne({ _id: userId, balance: { $gte: lotPrice } }, { $inc: { balance: -lotPrice } });
        if (userUpdate.modifiedCount === 0) {
            console.log('NoMoney');
            throw new common_1.BadRequestException('NoMoney');
        }
        try {
            await chat_model_1.ChatModel.create({
                userTo: lot.author,
                userFrom: userId,
                lot: lot._id,
                type: 'deal'
            });
        }
        catch (error) {
            console.log('ошибка при создание чата сделки', error);
            return;
        }
        this.notificationGateWay.sendNotification({ lotId, to: lot.author.toString(), from: userId.toString(), notification: 'lotPurchased' });
        return { success: true };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway])
], PaymentService);
//# sourceMappingURL=payment.service.js.map