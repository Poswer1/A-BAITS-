import { ChatService } from "./chat.service";
import { JwtService } from "@nestjs/jwt";
import { Server, Socket } from "socket.io";
export declare class ChatGateway {
    private chatService;
    private readonly jwtService;
    private activeUser;
    constructor(chatService: ChatService, jwtService: JwtService);
    server: Server;
    newReview(to: string, newMessage: any, chatStatusText: string): Promise<void>;
    newMessage(data: {
        chatId: string;
        message: string;
    }, client: Socket): Promise<void | {
        from: import("mongoose").Types.ObjectId | {
            _id: import("mongoose").Types.ObjectId;
        };
        to: import("mongoose").Types.ObjectId;
        message: string;
        status: string;
        createdAt: Date;
    }>;
    getChatHistory(data: {
        chatId: string;
    }, client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}
