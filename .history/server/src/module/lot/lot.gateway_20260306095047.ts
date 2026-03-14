import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { LotService } from "./lot.service";
import { Server } from 'socket.io';
import { Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";


@WebSocketGateway({ cors: true })// говорим что эта папка испозует webSocket
export class LotGateway {

    private onlineUsers: Map<string, string> = new Map();
    private historyUser: Map<string, string> = new Map();

    constructor(
    private lotService:LotService,
    private readonly jwtSerice:JwtService
    ) {}

    @WebSocketServer() // создаем сервер webSocket
    server:Server 

    @SubscribeMessage('joinLot')
    async handleJoin (@MessageBody() lotId:string, @ConnectedSocket() client:Socket) {
        client.join(lotId)
    }

    @SubscribeMessage('placeBid') 
    async handelBid(@MessageBody() data: {lotId: string, bid: number}, @ConnectedSocket() client:Socket) {

    const userId = this.onlineUsers.get(client.id)
    if(!userId) {
        console.log('пользователь не найден при попытки записи историю ставок')
        return 
    }

    const result = await this.lotService.placeBid(data, userId)
    
    this.server.to(data.lotId).emit('bidUpdated', result)
    return result
    }

    @SubscribeMessage('HistoryBid')
    async getHistoryBid(@MessageBody() lotId:string, @ConnectedSocket() client: Socket) {
        const result = await this.lotService.getHistoryBid(lotId)

        client.emit('getHistoryBid', result) // отдаем текущему пользователю
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