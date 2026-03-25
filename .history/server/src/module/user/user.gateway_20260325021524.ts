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

    @SubscribeMessage('ConnectOnlineUser')
    async handleOnlineUser(@ConnectedSocket() client: Socket) {
        const userId = this.onlineUsers.get(client.id)
        if(!userId) {
            return
        }
        client.emit('onlineUser', this.onlineUsers)
        console.log('new user online')
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
        this.onlineUsers.set(client.id, userId)

    }

    async handleDisconnect(client:Socket) {
        this.onlineUsers.delete(client.id)
    }


}