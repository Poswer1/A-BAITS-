"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_model_1 = require("../../models/chat.model");
const mongoose_1 = require("mongoose");
let ChatService = class ChatService {
    async newMessage(userId, data) {
        if (!userId || !data)
            return console.log('не нашли данные при создание сообщения');
        let chat = await chat_model_1.ChatModel.findOne({
            $or: [
                { userFrom: userId, userTo: data.toUserId },
                { userFrom: data.toUserId, userTo: userId }
            ]
        });
        if (!chat) {
            chat = await chat_model_1.ChatModel.create({
                userFrom: new mongoose_1.Types.ObjectId(userId),
                userTo: new mongoose_1.Types.ObjectId(data.toUserId),
                lot: data.numberLot,
                messages: []
            });
        }
        const newMessage = {
            from: new mongoose_1.Types.ObjectId(userId),
            to: new mongoose_1.Types.ObjectId(data.toUserId),
            message: data.message,
            read: false,
            createdAt: new Date()
        };
        chat.messages.push(newMessage);
        await chat.save();
        return newMessage;
    }
    async getMyChat(userId) {
        try {
            const chats = await chat_model_1.ChatModel.find({
                $or: [
                    { userFrom: userId },
                    { userTo: userId }
                ]
            })
                .populate('userFrom', 'name avatar')
                .populate('userTo', 'name avatar');
            return chats;
        }
        catch (error) {
            throw new common_1.BadRequestException('Ошибка при получение всех моих чатов', error);
        }
    }
    async getChatHistory(toUserId, userId) {
        try {
            const history = await chat_model_1.ChatModel.findOne({
                $or: [
                    { userFrom: toUserId, userTo: userId },
                    { userFrom: userId, userTo: toUserId },
                ]
            });
            if (!history)
                return { historyMessage: [], numberLot: null };
            return { historyMessage: history.messages, numberLot: history.lot };
        }
        catch (error) {
            throw new common_1.BadRequestException('Ошибка при получение истории чата', error);
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)()
], ChatService);
//# sourceMappingURL=chat.service.js.map