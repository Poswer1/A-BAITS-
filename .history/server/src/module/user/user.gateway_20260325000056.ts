import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UserService } from "./user.service";
import { Server } from "socket.io";

@WebSocketGateway({cors:true})

export class UserGateway {
    constructor(private readonly userService: UserService) {}

    @WebSocketServer()
    server:Server
}