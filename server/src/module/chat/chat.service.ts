import { BadRequestException, Injectable } from "@nestjs/common";
import { ChatModel } from "src/models/chat.model";
import { Types } from "mongoose";

@Injectable()
export class ChatService {
    async newMessage(userId:string, data: any) {
        if(!userId || !data) return console.log('не нашли данные при создание сообщения')
           
        let chat = await ChatModel.findOne({
            $or: [
                {userFrom: userId, userTo: data.toUserId},
                {userFrom: data.toUserId, userTo: userId}
            ]
        }) 

        if(!chat) {
            chat = await ChatModel.create({
                userFrom: new Types.ObjectId(userId),
                userTo: new Types.ObjectId(data.toUserId),
                lot: data.numberLot,
                messages: []
            })
        }

        const newMessage = {
            from: new Types.ObjectId(userId),
            to: new Types.ObjectId(data.toUserId),
            message: data.message,
            read: false,
            createdAt: new Date()
        }

        chat.messages.push(newMessage)
        await chat.save()


        return newMessage;
    }

    async getMyChat(userId:string) {
        try {
            const chats = await ChatModel.find({
                $or: [
                    {userFrom: userId},
                    {userTo: userId}
                ]
            })
            .populate('userFrom', 'name avatar')
            .populate('userTo', 'name avatar')
            return chats
        } catch (error) {
            throw new BadRequestException('Ошибка при получение всех моих чатов',error)
        }
    }

    async getChatHistory(toUserId:string, userId:string) {
        try {
            const history = await ChatModel.findOne({
                $or: [
                    {userFrom: toUserId, userTo: userId},
                    {userFrom: userId, userTo: toUserId},
                ]
            })
            if(!history) return {historyMessage: [], numberLot: null};
            return {historyMessage: history.messages, numberLot: history.lot}
        } catch (error) {
            throw new BadRequestException('Ошибка при получение истории чата',error)
        }
    }
}