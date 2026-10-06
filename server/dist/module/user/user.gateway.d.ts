import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
export declare class UserGateway {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private onlineUsers;
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
}
