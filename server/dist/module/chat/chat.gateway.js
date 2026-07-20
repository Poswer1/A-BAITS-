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
    async newReview(to, newMessage, chatStatusText) {
        this.server.to(to).emit('newReview', { newMessage, chatStatusText });
    }
    async newMessage(data, client) {
        const senderId = client.data.userId;
        const role = client.data.role;
        if (!senderId)
            return console.log('не нашли userId при отправки сообщения');
        const chat = await this.chatService.newMessage({ chatId: data.chatId, message: data.message }, senderId.toString(), role);
        this.server.to(data.chatId).emit('message', chat);
        return chat;
    }
    async getChatHistory(data, client) {
        const userId = this.activeUser.get(client.id);
        if (!data.chatId || !userId)
            return console.log('ошибка при получение истории чата');
        const history = await this.chatService.getChatHistory(data.chatId);
        client.emit('getHistory', history);
    }
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
            const role = payload.role;
            client.join(userId);
            client.data.userId = userId;
            client.data.role = role;
            this.activeUser.set(client.id, userId);
            const allChats = await this.chatService.getUserChat(userId);
            allChats.forEach(chat => {
                client.join(chat._id.toString());
            });
        }
        catch (error) {
            console.log('JWT ошибка при подключении сокета:', error instanceof Error ? error.message : error);
            client.disconnect();
        }
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
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "getChatHistory", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [chat_service_1.ChatService, jwt_1.JwtService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map