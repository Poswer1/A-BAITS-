import { BadRequestException, Injectable } from "@nestjs/common";
import { ChatModel } from "src/models/chat.model";
import { Types } from "mongoose";
import { LotModel } from "src/models/lot.model";
import { log } from "console";

@Injectable()
export class ChatService {
    async newMessage(userId:string, data: any) {
        if(!userId || !data) return console.log('не нашли данные при создание сообщения')
           
        let chat = await ChatModel.findOne({
            $or: [
                {userFrom: userId, userTo: data.toUserId},
                {userFrom: data.toUserId, userTo: userId}
            ],
            type: data.type
        }) 

        if(!chat) {
            const lotDoc = await LotModel.findOne({ lotNumber: data.numberLot }).select('_id');
            chat = await ChatModel.create({
                userFrom: new Types.ObjectId(userId),
                userTo: new Types.ObjectId(data.toUserId),
                lot: lotDoc?._id,
                type: 'default',
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
                userTo: userId,
                'messages.read': false
            })
            .populate('userFrom userTo', 'name avatar')
            .populate('lot', 'name images')
            return chats
        } catch (error) {
            throw new BadRequestException('Ошибка при получение всех моих чатов',error)
        }
    }

    async readChat(toUserId:string, fromUserId:string, type:string, lot:string) {
        await ChatModel.findOneAndUpdate(
        {
            $or: [
            { userFrom: fromUserId, userTo: toUserId },
            { userFrom: toUserId, userTo: fromUserId }
            ],
            type,
            lot,
            "messages.to": fromUserId,
            "messages.read": false
        },
        {
            $set: {
            "messages.$[elem].read": true
            }
        },
        {
        arrayFilters: [
        { "elem.to": fromUserId, "elem.read": false } // берет каждый элемент массива и выполняет $set там где подходит наши условия
        ],
        returnDocument: 'after'
        }
        )
        return {success:true}
    }

    async getChatHistory(toUserId:string, type:string, userId:string) {
        try {
            const history = await ChatModel.findOne({
                $or: [
                    {userFrom: toUserId, userTo: userId},
                    {userFrom: userId, userTo: toUserId},
                ],
                type: type
            }).populate('lot', 'name images startPrice lotNumber _id')
            if(!history) return {historyMessage: [], numberLot: null};
            return {history}
        } catch (error) {
            throw new BadRequestException('Ошибка при получение истории чата',error)
        }
    }
}