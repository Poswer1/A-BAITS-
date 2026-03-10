import { JwtService } from "@nestjs/jwt";
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
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

    @SubscribeMessage('')

    @SubscribeMessage('listenHistory')
    async getHistoryNotification(@ConnectedSocket() client:Socket) {
        const userId = client.data.userId
        if(!userId) {
            console.log('айди не найден при получении истории уведомелний')
            return
        }
        const notification = await this.notificationService.getHistoryNotification(userId)
        client.emit('historyNotification', notification)
    }

    async sendNotification(data: {lotId:string, to:string, from:string, notification:string}) {
        const {to, from, notification, lotId} = data

        const newNotification = await this.notificationService.createNotification(lotId, from, to, notification)
        
        for(const id of [to, from]) {
            this.server.to(id).emit('newNotification', newNotification)
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