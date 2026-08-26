import { BadRequestException, Injectable } from "@nestjs/common";
import { ChatModel } from "src/models/chat.model";
import { Types } from "mongoose";
import { EmailService } from "../email/email.service";
import { NotificationService } from "../notification/notification.service";
import { NotificationGateway } from "../notification/notification.gateway";

@Injectable()
export class ChatService {

    constructor (
        private readonly emailService:EmailService,
        private readonly notificationGateway:NotificationGateway
    ) {}

    async newMessage(data: {chatId:string, message:string}, userId:string, role:string) {
        if(!userId || !data) return console.log('не нашли данные при создание сообщения')
           
        let chat = await ChatModel.findById(data.chatId)

        if(!chat) throw new BadRequestException()

        const myInterlocutor = chat.users.filter(u => u.toString() !== userId.toString())


        const newMessage = {
            from: new Types.ObjectId(userId),
            to: new Types.ObjectId(myInterlocutor[0]),
            message: data.message,
            status: role,
            createdAt: new Date()
        }

        chat.messages.push(newMessage)
        await chat.save()

        await this.notificationGateway.sendNotification({
            to: newMessage.to.toString(),
            from: userId,
            notification: 'newChatMessage',
            lotId: chat.lot.toString(),
        })

        await chat.populate('users', 'avatar name')
        const populatedFrom = chat.users.find(u => u._id.equals(newMessage.from))
        return {
        ...newMessage,
        from: populatedFrom || {_id: newMessage.from} 
        }
    }
    private inviteCooldown = new Map<string, number>();
    async inviteAdmin(id:string) {
        const lastRequest = this.inviteCooldown.get(id);

        // 60 секунд
        if (lastRequest && Date.now() - lastRequest < 60_000) {
            throw new BadRequestException('ExceededLimitPerMinute');
        }
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
        await this.emailService.sendEmail('knozenko2@gmail.com', 'Приглашение модератора в чат', html)
        this.inviteCooldown.set(id, Date.now());
        return {success:true}
    }

    async confirmInvite(lotId:string, userId:string) {
        try {
            await ChatModel.findOneAndUpdate(
                {
                    _id: lotId,
                    "users": {$ne:userId}
                },
                {
                    $push: {
                        users: userId
                    }
                }
            )
            return {success:true}
        } catch (error) {
            console.log(error)
            throw new BadRequestException('errorConfirmInvite')
        }
    }

    async getUserChat(userId:string) {
        try {
            const allChats = await ChatModel.find({
               users: { $in: [userId]}
            })
            return allChats
        } catch (error) {
            throw error
        }
    }

    async getChatId(myId:string, userId:string, lotId:string) {
        try {
            const chatId = await ChatModel.findOne({
                users: { $all: [new Types.ObjectId(myId), new Types.ObjectId(userId)]},
                lot: lotId
            }).select('_id')
            if(!chatId) throw new BadRequestException('Чат не найден')
            return chatId._id
        } catch (error:any) {
            console.error(error);
            throw new BadRequestException('Ошибка при получении id чата');
        }
    }

    async getMyChat(userId:string) {
        try {
            const allChats = await ChatModel.find({
               users: { $in: [userId] }
            })
            .populate('users', 'name avatar')
            .populate('lot', 'name images type status')
            
            const ActiveChat: typeof allChats = [];
            const NotActiveChat: typeof allChats = [];

            allChats.forEach(chat => {
                const hasActive = chat.status === 'Active'
                if (hasActive) {
                    ActiveChat.push(chat); 
                } else {
                    NotActiveChat.push(chat); 
                }
            });
            return {ActiveChat, NotActiveChat}

        } catch (error:any) {
            throw new BadRequestException('Ошибка при получение всех моих чатов',error)
        }
    }

    async getChatHistory(chatId:string, userId:string) {
        try {
            const history = await ChatModel.findById(chatId)
            if(!history) return {historyMessage: [], numberLot: null};
            if (!history.users.some(user => user.toString() === userId.toString())) {
                throw new BadRequestException('NotChatParticipant')
            }

            await this.notificationGateway.removeChatNotifications(userId, history.lot.toString())

            await history.populate([
                { path: 'users', select: 'avatar name _id' },
                { path: 'messages.from', select: 'avatar name _id' },
                { path: 'lot', select: 'name images startPrice lotNumber redemptionMethod blitzPrice' },
            ])
            return {history}
        } catch (error:any) {
            throw new BadRequestException('Ошибка при получение истории чата',error)
        }
    }
}