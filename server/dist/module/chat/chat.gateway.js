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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const chat_service_1 = require("./chat.service");
const jwt_1 = require("@nestjs/jwt");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    chatService;
    jwtService;
    activeUser = new Map();
    constructor(chatService, jwtService) {
        this.chatService = chatService;
        this.jwtService = jwtService;
    }
    server;
    async newMessage(data, client) {
        const senderId = this.activeUser.get(client.id);
        if (!senderId)
            return console.log('не нашли userId при отправки сообщения');
        const chat = await this.chatService.newMessage(senderId, data);
        for (const [socketId, userId] of this.activeUser.entries()) {
            if (userId === data.toUserId || userId === senderId) {
                const sock = this.server.sockets.sockets.get(socketId);
                sock?.emit('message', chat);
            }
        }
        return chat;
    }
    async getChatHistory(toUserId, client) {
        const userId = this.activeUser.get(client.id);
        if (!userId || !toUserId)
            return console.log('ошибка при получение истории чата');
        const history = await this.chatService.getChatHistory(toUserId, userId);
        client.emit('getHistory', history);
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
        this.activeUser.set(client.id, userId);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "newMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getChatHistory'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getChatHistory", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [chat_service_1.ChatService, jwt_1.JwtService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map