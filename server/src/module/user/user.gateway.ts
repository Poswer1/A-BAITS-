import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UserService } from "./user.service";
import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway({cors:true})

export class UserGateway {

    constructor(private readonly jwtService: JwtService) {}

    private onlineUsers: Map<string, string> = new Map()

    @WebSocketServer()
    server:Server

    async handleConnection(client:Socket) {
        const cookies = client.handshake.headers.cookie || ''
        let token = cookies
            .split('; ')
            .find(c => c.startsWith('token='))
            ?.split('=')[1];

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
            this.onlineUsers.set(client.id, userId)

            const onlineIds = Array.from(new Set(this.onlineUsers.values()))

            this.server.emit('user-online', userId)
            client.emit('current-online', onlineIds)
        } catch (error) {
            console.log('JWT ошибка при подключении сокета:', error instanceof Error ? error.message : error)
            client.disconnect()
        }
    }

    async handleDisconnect(client:Socket) {
        this.onlineUsers.delete(client.id)
        const onlineIds = Array.from(new Set(this.onlineUsers.values()))
        this.server.emit('current-online', onlineIds)
    }


}