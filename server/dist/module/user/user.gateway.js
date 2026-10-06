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
exports.UserGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
let UserGateway = class UserGateway {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    onlineUsers = new Map();
    server;
    async handleConnection(client) {
        const cookies = client.handshake.headers.cookie || '';
        let token = cookies
            .split('; ')
            .find(c => c.startsWith('token='))
            ?.split('=')[1];
        if (!token && client.handshake.auth?.token) {
            token = client.handshake.auth.token?.replace('Bearer ', '');
        }
        if (!token) {
            console.log('JWT не предоставлен');
            client.disconnect();
            return;
        }
        try {
            const payload = await this.jwtService.verify(token);
            const userId = payload._id;
            this.onlineUsers.set(client.id, userId);
            const onlineIds = Array.from(new Set(this.onlineUsers.values()));
            this.server.emit('user-online', userId);
            client.emit('current-online', onlineIds);
        }
        catch (error) {
            console.log('JWT ошибка при подключении сокета:', error instanceof Error ? error.message : error);
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        this.onlineUsers.delete(client.id);
        const onlineIds = Array.from(new Set(this.onlineUsers.values()));
        this.server.emit('current-online', onlineIds);
    }
};
exports.UserGateway = UserGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserGateway.prototype, "server", void 0);
exports.UserGateway = UserGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map