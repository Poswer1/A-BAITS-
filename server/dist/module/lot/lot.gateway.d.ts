import { LotService } from "./lot.service";
import { Server } from 'socket.io';
import { Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
export declare class LotGateway {
    private lotService;
    private readonly jwtSerice;
    private onlineUsers;
    private historyUser;
    constructor(lotService: LotService, jwtSerice: JwtService);
    server: Server;
    handleJoin(lotId: string, client: Socket): Promise<void>;
    handelBid(data: {
        lotId: string;
        bid: number;
    }, client: Socket): Promise<{
        lotId: string;
        newPrice: number;
        lastBid: {
            authorId: any;
            name: any;
            avatar: any;
            currentBid: number;
            dateBid: Date | undefined;
        };
    } | null | undefined>;
    getHistoryBid(lotId: string, client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}
