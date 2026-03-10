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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notification_service_1 = require("./notification.service");
let NotificationGateway = class NotificationGateway {
    jwtService;
    notificationService;
    constructor(jwtService, notificationService) {
        this.jwtService = jwtService;
        this.notificationService = notificationService;
    }
    server;
    async readNotification(client) {
        const userId = client.data.userId;
        if (!userId) {
            console.log('айди не найден при прочтения сообщений');
            return;
        }
        await this.notificationService.read(userId);
        client.emit('read');
    }
    async checkRead(client) {
        const userId = client.data.userId;
        if (!userId) {
            console.log('айди не найден при прочтения сообщений');
            return;
        }
        const read = await this.notificationService.checkRead(userId);
        client.emit('checkRead', read);
    }
    async getHistoryNotification(client) {
        const userId = client.data.userId;
        if (!userId) {
            console.log('айди не найден при получении истории уведомелний');
            return;
        }
        const notification = await this.notificationService.getHistoryNotification(userId);
        client.emit('historyNotification', notification);
    }
    async sendNotification(data) {
        const { to, from, notification, lotId } = data;
        const newNotification = await this.notificationService.createNotification(lotId, from, to, notification);
        for (const id of [to, from]) {
            this.server.to(id).emit('newNotification', newNotification);
        }
    }
    async handleConnection(client) {
        const token = client.handshake.auth.token?.replace('Bearer ', '');
        if (!token) {
            console.log('JWT не предоставлен');
            client.disconnect();
            return;
        }
        const payload = await this.jwtService.verify(token);
        const userId = payload._id;
        client.join(userId);
        client.data.userId = userId;
        console.log(`Пользователь ${userId} подключился`);
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('readNotification'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "readNotification", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkRead'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "checkRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('listenHistory'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "getHistoryNotification", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        notification_service_1.NotificationService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map