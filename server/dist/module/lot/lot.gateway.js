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
exports.LotGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const lot_service_1 = require("./lot.service");
const socket_io_1 = require("socket.io");
const socket_io_2 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
let LotGateway = class LotGateway {
    lotService;
    jwtSerice;
    onlineUsers = new Map();
    historyUser = new Map();
    constructor(lotService, jwtSerice) {
        this.lotService = lotService;
        this.jwtSerice = jwtSerice;
    }
    server;
    async handleJoin(lotId, client) {
        client.join(lotId);
    }
    async handelBid(data, client) {
        const userId = this.onlineUsers.get(client.id);
        if (!userId) {
            console.log('пользователь не найден при попытки записи историю ставок');
            return;
        }
        const result = await this.lotService.placeBid(data, userId);
        this.server.to(data.lotId).emit('bidUpdated', result);
        return result;
    }
    async getHistoryBid(lotId, client) {
        const result = await this.lotService.getHistoryBid(lotId);
        client.emit('getHistoryBid', result);
    }
    async handleConnection(client) {
        const token = client.handshake.auth.token?.replace('Bearer ', '');
        if (!token) {
            console.log('JWT не предоставлен');
            client.disconnect();
            return;
        }
        const payload = await this.jwtSerice.verify(token);
        const userId = payload._id;
        this.onlineUsers.set(client.id, userId);
        console.log(`Пользователь ${userId} подключился`);
    }
};
exports.LotGateway = LotGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], LotGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinLot'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_2.Socket]),
    __metadata("design:returntype", Promise)
], LotGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('placeBid'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_2.Socket]),
    __metadata("design:returntype", Promise)
], LotGateway.prototype, "handelBid", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('HistoryBid'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_2.Socket]),
    __metadata("design:returntype", Promise)
], LotGateway.prototype, "getHistoryBid", null);
exports.LotGateway = LotGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [lot_service_1.LotService,
        jwt_1.JwtService])
], LotGateway);
//# sourceMappingURL=lot.gateway.js.map