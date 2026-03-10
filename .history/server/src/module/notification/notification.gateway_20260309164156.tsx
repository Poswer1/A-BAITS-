import {WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({cors:true})
export class notificationGateway {
    @WebSocketServer()
        server:Server
}