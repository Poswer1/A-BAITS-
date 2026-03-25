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
const lot_model_1 = require("../../models/lot.model");
let ChatService = class ChatService {
    async newMessage(userId, data) {
        if (!userId || !data)
            return console.log('не нашли данные при создание сообщения');
        let chat = await chat_model_1.ChatModel.findOne({
            $or: [
                { userFrom: userId, userTo: data.toUserId },
                { userFrom: data.toUserId, userTo: userId }
            ],
            type: data.type
        });
        if (!chat) {
            const lotDoc = await lot_model_1.LotModel.findOne({ lotNumber: data.numberLot }).select('_id');
            chat = await chat_model_1.ChatModel.create({
                userFrom: new mongoose_1.Types.ObjectId(userId),
                userTo: new mongoose_1.Types.ObjectId(data.toUserId),
                lot: lotDoc?._id,
                type: 'default',
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
            const allChats = await chat_model_1.ChatModel.find({
                $or: [
                    { userFrom: userId },
                    { userTo: userId }
                ],
            })
                .populate('userFrom userTo', 'name avatar')
                .populate('lot', 'name images type status');
            const unReadChats = [];
            const readChats = [];
            allChats.forEach(chat => {
                const hasUnread = chat.messages.some(msg => msg.to.toString() === userId && !msg.read);
                if (hasUnread) {
                    unReadChats.push(chat);
                }
                else {
                    readChats.push(chat);
                }
            });
            return { unReadChats, readChats };
        }
        catch (error) {
            throw new common_1.BadRequestException('Ошибка при получение всех моих чатов', error);
        }
    }
    async readChat(toUserId, fromUserId, type, lot) {
        const updateChat = await chat_model_1.ChatModel.findOneAndUpdate({
            $or: [
                { userFrom: fromUserId, userTo: toUserId },
                { userFrom: toUserId, userTo: fromUserId }
            ],
            type,
            lot,
            "messages.to": fromUserId,
            "messages.read": false
        }, {
            $set: {
                "messages.$[elem].read": true
            }
        }, {
            arrayFilters: [
                { "elem.to": fromUserId, "elem.read": false }
            ],
            returnDocument: 'after'
        })
            .populate('userFrom userTo', 'name avatar')
            .populate('lot', 'name images startPrice lotNumber _id');
        return updateChat;
    }
    async getChatHistory(toUserId, type, userId, lot) {
        try {
            const history = await chat_model_1.ChatModel.findOne({
                $or: [
                    { userFrom: toUserId, userTo: userId },
                    { userFrom: userId, userTo: toUserId },
                ],
                type: type,
                lot: lot,
            }).populate('lot', 'name images startPrice lotNumber _id');
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
    (0, common_1.Injectable)()
], ChatService);
//# sourceMappingURL=chat.service.js.map