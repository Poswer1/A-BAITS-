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

    async sendNotification(data: {lotId:string, to:string, from:string, notification:string}) {
        const {to, from, notification, lotId} = data

        const newNotification = await this.notificationService.createNotification(lotId, from, to, notification)
    
        this.server.to(to).emit('newNotification', newNotificationAuthor)
        this.server.to(from).emit('newNotification', newNotification)
        
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