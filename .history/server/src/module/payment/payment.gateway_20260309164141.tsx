import {WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({cors:true})
export class PaymentGateway {
    @WebSocketServer()
    server:Server
}