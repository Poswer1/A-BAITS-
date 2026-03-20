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
exports.CronSerivce = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const lot_model_1 = require("../../models/lot.model");
const notification_gateway_1 = require("../notification/notification.gateway");
const payment_service_1 = require("../payment/payment.service");
let CronSerivce = class CronSerivce {
    paymentService;
    notificationGateWay;
    constructor(paymentService, notificationGateWay) {
        this.paymentService = paymentService;
        this.notificationGateWay = notificationGateWay;
    }
    async checkLot() {
        console.log('CRON ПРОВЕРЯЕТ');
        try {
            const nowDate = new Date();
            const expiredLots = await lot_model_1.LotModel.find({
                date: { $lte: nowDate },
                status: 'Active'
            });
            if (expiredLots.length === 0)
                return;
            for (const lot of expiredLots) {
                try {
                    if (lot.historyBid.length > 0) {
                        const winner = lot.historyBid[0];
                        await this.paymentService.buyLot(winner.author.toString(), { lotId: lot.lotNumber.toString(), price: winner.currentBid });
                    }
                    else {
                        if (lot.autoReExtension) {
                            const oneDayMs = 24 * 60 * 60 * 1000;
                            const sevenDaysMs = 7 * oneDayMs;
                            const newDate = new Date(lot.date.getTime() + sevenDaysMs);
                            const [hours, minutes] = lot.dateTime.split(':').map(Number);
                            newDate.setHours(hours, minutes, 0, 0);
                            lot.date = newDate;
                            console.log('лот перевыставлен');
                        }
                        else {
                            lot.status = 'Archive';
                            console.log(`Лот ${lot._id} завершён без ставок`);
                        }
                    }
                    await lot.save();
                    if (lot.historyBid.length === 0 && lot.autoReExtension) {
                        await this.notificationGateWay.sendNotification({ lotId: lot.lotNumber, to: lot.author.toString(), notification: 'lotRelisted' });
                    }
                    else if (lot.historyBid.length === 0 && !lot.autoReExtension) {
                        await this.notificationGateWay.sendNotification({ lotId: lot.lotNumber, to: lot.author.toString(), notification: 'lotNotRedeemed' });
                    }
                }
                catch (error) {
                    console.error('CRON ошибка лота', lot._id, error);
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CronSerivce = CronSerivce;
__decorate([
    (0, schedule_1.Cron)('*/1 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronSerivce.prototype, "checkLot", null);
exports.CronSerivce = CronSerivce = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        notification_gateway_1.NotificationGateway])
], CronSerivce);
//# sourceMappingURL=cron.service.js.map