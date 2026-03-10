import {MessageBody, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({cors:true})

export class NotificationGateway {

    constructor(private )

    @WebSocketServer()
    server:Server

    async sendNotification(@MessageBody() data: {to:string, from:string, notification:string}) {

    }

    async handleConnection(client:Socket) {
        const token = client.handshake.auth.token?.replace('Bearer ', ''); 
        // при первом подключение клиента к сокету в handshake записываеться инфа о пользователи
        // в auth мы на клиенте передаем токен
    
        if(!token) {
            console.log('JWT не предоставлен');
            client.disconnect();
            return
        }
    
        const payload = await this.jwtSerice.verify(token)
        const userId = payload._id
    
        this.onlineUsers.set(client.id, userId) // client.id это ключ под которым записан наш userId
        console.log(`Пользователь ${userId} подключился`);
    }

}