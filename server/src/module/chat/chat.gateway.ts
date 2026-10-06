import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { JwtService } from "@nestjs/jwt";
import { Server, Socket } from "socket.io";

@WebSocketGateway({cors:true}) // говорим что эта папка испозует webSocket
export class ChatGateway {

    private activeUser: Map<string, string> = new Map()

    constructor(private chatService: ChatService, private readonly jwtService: JwtService) {}

    @WebSocketServer()
    server:Server

    async newReview(to:string, newMessage:any, chatStatusText:string) {
        this.server.to(to).emit('newReview', {newMessage, chatStatusText})
    }
    
    @SubscribeMessage('newMessage')
    async newMessage(@MessageBody() data:{chatId:string, message:string}, @ConnectedSocket() client:Socket) {
        const senderId = client.data.userId
        const role = client.data.role
        if(!senderId) return console.log('не нашли userId при отправки сообщения')
        
        const chat = await this.chatService.newMessage({ chatId: data.chatId, message: data.message }, senderId.toString(), role)

        this.server.to(data.chatId).emit('message', chat)

        return chat
    }

    @SubscribeMessage('getChatHistory')
    async getChatHistory(@MessageBody() data:{chatId:string}, @ConnectedSocket() client:Socket) {
        const userId = client.data.userId || this.activeUser.get(client.id)
        if(!data.chatId || !userId) return console.log('ошибка при получение истории чата')
        const history = await this.chatService.getChatHistory(data.chatId, userId)

        client.emit('getHistory', history) // отдаем текущему пользователю
    }

    async handleConnection(client:Socket) {
        const cookies = client.handshake.headers.cookie || ''
        let token = cookies
        .split('; ')
        .find(c => c.startsWith('token='))
        ?.split('=')[1]; 
        // в cookies токен выглядт так token=a3223 
        // тут разделяем его по = получим token отедельно и a3223 и берем [1] 

        if(!token && client.handshake.auth?.token) {
            token = client.handshake.auth.token?.replace('Bearer ', '');
        }

        if(!token) {
            console.log('JWT не предоставлен');
            client.disconnect();
            return
        }

        try {
            const payload = await this.jwtService.verify(token)
            const userId = payload._id
            const role = payload.role
            client.join(userId)
            client.data.userId = userId
            client.data.role = role
            this.activeUser.set(client.id, userId)

            const allChats = await this.chatService.getUserChat(userId)

            allChats.forEach(chat => {
                client.join(chat._id.toString())
            })
        } catch (error) {
            console.log('JWT ошибка при подключении сокета:', error instanceof Error ? error.message : error)
            client.disconnect()
        }
    }
}