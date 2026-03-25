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

    @SubscribeMessage('readNotification')
    async readNotification(@ConnectedSocket() client:Socket) {
        const userId = client.data.userId
        if(!userId) {
            console.log('айди не найден при прочтения сообщений')
            return
        }
        await this.notificationService.read(userId)
        client.emit('read')
    }

    @SubscribeMessage('checkRead')
    async checkRead(@ConnectedSocket() client:Socket) {
        const userId = client.data.userId
        if(!userId) {
            console.log('айди не найден при прочтения сообщений')
            return
        }
        const read = await this.notificationService.checkRead(userId)
        client.emit('checkRead', read)
    }

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

    async sendNotification(data: {lotId:string, to:string, from?:string, notification:string}) {
        const {to, from, notification, lotId} = data
            if(from) {
                const newNotification = await this.notificationService.createNotification(lotId, from, to, notification)
                for(const id of [to, from]) {
                    this.server.to(id).emit('newNotification', newNotification)
                } 
            } else {
                const newNotification = await this.notificationService.createNotification(lotId, 'empty', to, notification)
                this.server.to(to).emit('newNotification', newNotification)
            }
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
        console.log(`Пользователь ${userId} подключился`);
    }

    async handleDisconnect(client:Socket) {
        client.data = ''
    }

}