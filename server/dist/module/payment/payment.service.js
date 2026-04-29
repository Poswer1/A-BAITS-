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
const email_service_1 = require("../email/email.service");
const logging_service_1 = require("../admin/logging/logging.service");
const finance_service_1 = require("../admin/finance/finance.service");
let PaymentService = class PaymentService {
    notificationGateWay;
    emailService;
    financeService;
    loggingService;
    constructor(notificationGateWay, emailService, financeService, loggingService) {
        this.notificationGateWay = notificationGateWay;
        this.emailService = emailService;
        this.financeService = financeService;
        this.loggingService = loggingService;
    }
    async buyLot(userId, dto) {
        const { lotId, price } = dto;
        const session = await mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const lot = await lot_model_1.LotModel.findById(lotId)
                .session(session);
            if (!lot)
                throw new Error('лот не найден');
            if (lot.author.toString() === userId.toString())
                throw new common_1.BadRequestException('bidYourself');
            const lotPrice = price ?? lot.blitzPrice;
            if (!lotPrice)
                throw new Error('нет цены');
            const user = await user_model_1.UserModel.findById(userId).session(session);
            if (!user)
                throw new common_1.BadRequestException('UserNotFound');
            if (user.balance <= -1)
                throw new common_1.BadRequestException('balanceInTheRed');
            const updateLot = await lot_model_1.LotModel.updateOne({ _id: lotId, winner: { $exists: false }, status: 'Active' }, { $set: { winner: userId, status: 'Sold' } }, { session });
            if (updateLot.modifiedCount === 0) {
                throw new common_1.BadRequestException('LotAlreadySold');
            }
            const priceWithCommission = lotPrice - (lotPrice * 0.05);
            const userUpdate = await user_model_1.UserModel.updateOne({ _id: lot.author }, { $inc: { balance: -priceWithCommission } }, { session });
            if (userUpdate.modifiedCount === 0)
                throw new common_1.BadRequestException('errorWriteOffMoneyAuthor');
            await chat_model_1.ChatModel.create([
                {
                    users: [lot.author, userId],
                    lot: lot._id,
                    type: 'deal'
                }
            ], { session });
            await session.commitTransaction();
            try {
                await this.financeService.createTransaction(priceWithCommission, lot.author.toString(), 'Debit', lot._id.toString());
                await this.loggingService.newLog(userId, 'buyLot', lotId);
                await this.notificationGateWay.sendNotification({
                    to: userId.toString(),
                    notification: 'lotWinner',
                    lotId,
                });
                await this.notificationGateWay.sendNotification({
                    to: lot.author.toString(),
                    notification: 'lotPurchased',
                    lotId,
                });
                const authorEmail = await user_model_1.UserModel.findById(lot.author).select('email');
                if (!authorEmail)
                    throw new common_1.BadRequestException('authorEmailNotFound');
                await this.emailService.sendEmail(authorEmail?.email.toString(), 'Тест Resend', '<h1>Лот куплен!</h1>');
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
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway,
        email_service_1.EmailService,
        finance_service_1.FinanceService,
        logging_service_1.LoggingService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map