import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({cors:true})

export class UserGateway {
    constructor(private ra)
}