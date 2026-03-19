import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { JwtService } from "@nestjs/jwt";
import { Server, Socket } from "socket.io";
import { Schema } from "mongoose";

@WebSocketGateway({cors:true}) // говорим что эта папка испозует webSocket
export class ChatGateway {

    private activeUser: Map<string, string> = new Map()

    constructor(private chatService: ChatService, private readonly jwtService: JwtService) {}

    @WebSocketServer()
    server:Server

    async newReview(to:string, newMessage:{from:Schema.Types.ObjectId, to:Schema.Types.ObjectId, message:string, read:boolean, createdAt:string, _id:string}) {
        this.server.to(to).emit('newReview', newMessage)
    }
    
    @SubscribeMessage('newMessage')
    async newMessage(@MessageBody() data:{toUserId:string, message:string, numberLot:string, type:string}, @ConnectedSocket() client:Socket) {
        const senderId = this.activeUser.get(client.id)
        if(!senderId) return console.log('не нашли userId при отправки сообщения')
        
        const chat = await this.chatService.newMessage(senderId, data)

        for(const [socketId, userId] of this.activeUser.entries()) { // entries возрощает ключ и значение под socketId подстовляем ключ под userId значение
            if(userId === data.toUserId || userId === senderId) { 
                const sock = this.server.sockets.sockets.get(socketId) // и достаем socket по ключу socketId считая client.id
                // при вызове handleConnection создаеться новый Map socket который хранит всех пользоватей которые подлючены, 
                // он лежит в io.socket и получаеться socket.socket и хранит в себе socketId ключ и Socket значение
                sock?.emit('message', chat) // и отпровляем событие этому клиенту
            }
        }

        return chat
    }

    @SubscribeMessage('getChatHistory')
    async getChatHistory(@MessageBody() data:{toUserId:string, type:string}, @ConnectedSocket() client:Socket) {
        const userId = this.activeUser.get(client.id)
        if(!userId || !data.toUserId) return console.log('ошибка при получение истории чата')
        const history = await this.chatService.getChatHistory(data.toUserId, data.type, userId)

        client.emit('getHistory', history) // отдаем текущему пользователю
    }

    async handleConnection(client:Socket) {
        const cookies = client.handshake.headers.cookie || ''
        const token = cookies
        .split('; ')
        .find(c => c.startsWith('token='))
        ?.split('=')[1]; 
        // в cookies токен выглядт так token=a3223 
        // тут разделяем его по = получим token отедельно и a3223 и берем [1] 

        if(!token) {
            console.log('JWT не предоставлен');
            client.disconnect();
            return
        }

        const payload = await this.jwtService.verify(token)
        const userId = payload._id
        client.join(userId)
        client.data.userId = userId
        this.activeUser.set(client.id, userId)

    }
}