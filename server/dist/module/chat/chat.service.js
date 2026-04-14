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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_model_1 = require("../../models/chat.model");
const mongoose_1 = require("mongoose");
const email_service_1 = require("../email/email.service");
const notification_gateway_1 = require("../notification/notification.gateway");
let ChatService = class ChatService {
    emailService;
    notificationGateway;
    constructor(emailService, notificationGateway) {
        this.emailService = emailService;
        this.notificationGateway = notificationGateway;
    }
    async newMessage(data, userId, role) {
        if (!userId || !data)
            return console.log('не нашли данные при создание сообщения');
        let chat = await chat_model_1.ChatModel.findById(data.chatId);
        if (!chat)
            throw new common_1.BadRequestException();
        const myInterlocutor = chat.users.filter(u => u._id.toString() !== userId.toString());
        const newMessage = {
            from: new mongoose_1.Types.ObjectId(userId),
            to: new mongoose_1.Types.ObjectId(myInterlocutor[0]),
            message: data.message,
            status: role,
            createdAt: new Date()
        };
        chat.messages.push(newMessage);
        await chat.save();
        await chat.populate('users', 'avatar name');
        const populatedFrom = chat.users.find(u => u._id.equals(newMessage.from));
        return {
            ...newMessage,
            from: populatedFrom || { _id: newMessage.from }
        };
    }
    async inviteAdmin(id) {
        const link = `http://localhost:3000/confirmInvite/${id}`;
        const html = `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Присоедениться к чату</h2>
                    <a href="${link}"
                    style="
                        display: inline-block;
                        padding: 14px 24px;
                        background: #ea580c;
                        color: #ffff;
                        text-decoration: none;
                        border-radius: 8px;
                        font-size: 16px;
                    ">
                    Присоедениться к чату
                    </a>

                    <p style="margin-top: 20px; font-size: 12px; color: gray;">
                    Если кнопка не работает, перейди по ссылке:
                    <br/>
                    "${link}"
                    </p>
                </div>
            `;
        await this.emailService.sendEmail('knozenko2@gmail.com', 'Приглашение модератора в чат', html);
        return { success: true };
    }
    async confirmInvite(lotId, userId) {
        try {
            await chat_model_1.ChatModel.findOneAndUpdate({
                _id: lotId,
                "users": { $ne: userId }
            }, {
                $push: {
                    users: userId
                }
            });
            return { success: true };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('errorConfirmInvite');
        }
    }
    async getUserChat(userId) {
        try {
            const allChats = await chat_model_1.ChatModel.find({
                users: { $in: [userId] }
            });
            return allChats;
        }
        catch (error) {
            throw error;
        }
    }
    async getMyChat(userId) {
        try {
            const allChats = await chat_model_1.ChatModel.find({
                users: { $in: [userId] }
            })
                .populate('users', 'name avatar')
                .populate('lot', 'name images type status');
            const ActiveChat = [];
            const NotActiveChat = [];
            allChats.forEach(chat => {
                const hasActive = chat.status === 'Active';
                if (hasActive) {
                    ActiveChat.push(chat);
                }
                else {
                    NotActiveChat.push(chat);
                }
            });
            return { ActiveChat, NotActiveChat };
        }
        catch (error) {
            throw new common_1.BadRequestException('Ошибка при получение всех моих чатов', error);
        }
    }
    async getChatHistory(chatId) {
        try {
            const history = await chat_model_1.ChatModel.findById(chatId)
                .populate('users', 'avatar name')
                .populate('messages.from', 'avatar name _id')
                .populate('lot', 'name images startPrice lotNumber');
            if (!history)
                return { historyMessage: [], numberLot: null };
            return { history };
        }
        catch (error) {
            throw new common_1.BadRequestException('Ошибка при получение истории чата', error);
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        notification_gateway_1.NotificationGateway])
], ChatService);
//# sourceMappingURL=chat.service.js.map