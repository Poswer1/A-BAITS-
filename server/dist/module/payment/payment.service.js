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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const lot_model_1 = require("../../models/lot.model");
const user_model_1 = require("../../models/user.model");
const notification_gateway_1 = require("../notification/notification.gateway");
const chat_model_1 = require("../../models/chat.model");
const mongoose_1 = __importDefault(require("mongoose"));
const transactions_model_1 = require("../../models/transactions.model");
const email_service_1 = require("../email/email.service");
let PaymentService = class PaymentService {
    notificationGateWay;
    emailService;
    constructor(notificationGateWay, emailService) {
        this.notificationGateWay = notificationGateWay;
        this.emailService = emailService;
    }
    async buyLot(userId, dto) {
        const { lotId, price } = dto;
        const session = await mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const lot = await lot_model_1.LotModel.findById(lotId).session(session);
            if (!lot)
                throw new Error('лот не найден');
            const lotPrice = price ?? lot.blitzPrice;
            if (!lotPrice)
                throw new Error('нет цены');
            const updateLot = await lot_model_1.LotModel.updateOne({ _id: lotId, winner: { $exists: false }, status: 'Active' }, { $set: { winner: userId, status: 'Completed' } }, { session });
            if (updateLot.modifiedCount === 0) {
                throw new common_1.BadRequestException('LotAlreadySold');
            }
            const userUpdate = await user_model_1.UserModel.updateOne({ _id: userId, balance: { $gte: lotPrice } }, { $inc: { balance: -lotPrice } }, { session });
            if (userUpdate.modifiedCount === 0) {
                throw new common_1.BadRequestException('NoMoney');
            }
            await chat_model_1.ChatModel.create([
                {
                    userTo: lot.author,
                    userFrom: userId,
                    lot: lot._id,
                    type: 'deal'
                }
            ], { session });
            await session.commitTransaction();
            try {
                await this.create(lot._id.toString(), lotPrice, userId);
                await this.notificationGateWay.sendNotification({
                    lotId,
                    to: lot.author.toString(),
                    from: userId.toString(),
                    notification: 'lotPurchased'
                });
                await this.emailService.sendEmail('knozenko@gmail.com', "привент", '<h1>Тестовое письмо</h1>');
            }
            catch (externalError) {
                console.error('Ошибка внешних операций:', externalError);
            }
            return { success: true };
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async create(lot, sum, user) {
        const createdTransaction = await transactions_model_1.TransactionModel.create({
            lot,
            sum,
            user,
            type: 'Approved'
        });
        if (!createdTransaction)
            throw new Error("Transaction creation failed");
        return { success: true };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway,
        email_service_1.EmailService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map