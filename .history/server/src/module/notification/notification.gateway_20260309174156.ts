import { JwtService } from "@nestjs/jwt";
import {ConnectedSocket, MessageBody, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { NotificationService } from "./notification.service";

@WebSocketGateway({cors:true})

export class NotificationGateway {

    constructor(
        private readonly jwtService:JwtService,
        private readonly notificationService: NotificationService
    ) {}

    @WebSocketServer()
    server:Server

    async sendNotification(@MessageBody() data: {to:string, from:string, notification:string}, @ConnectedSocket() client:Server) {
        const {to, from, notification} = data

        for(const id of [to, from]) {
            cli
        }
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
    
        const payload = await this.jwtService.verify(token)
        const userId = payload._id
        
        client.join(userId)
        client.data.userId = userId
        console.log(`Пользователь ${userId} подключился`);
    }

}