import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UserService } from "./user.service";
import { Server } from "socket.io";

@WebSocketGateway({cors:true})

export class UserGateway {

    private onlineUser: Map<string, string> = new Map()

    @WebSocketServer()
    server:Server

    


}