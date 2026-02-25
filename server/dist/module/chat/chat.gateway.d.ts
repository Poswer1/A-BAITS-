import { ChatService } from "./chat.service";
import { JwtService } from "@nestjs/jwt";
import { Server, Socket } from "socket.io";
export declare class ChatGateway {
    private chatService;
    private readonly jwtService;
    private activeUser;
    constructor(chatService: ChatService, jwtService: JwtService);
    server: Server;
    newMessage(data: {
        toUserId: string;
        message: string;
        numberLot: string;
    }, client: Socket): Promise<void | {
        from: import("mongoose").Types.ObjectId;
        to: import("mongoose").Types.ObjectId;
        message: any;
        read: boolean;
        createdAt: Date;
    }>;
    getChatHistory(toUserId: string, client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}
