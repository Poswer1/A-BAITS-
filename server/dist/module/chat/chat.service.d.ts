import { Types } from "mongoose";
import { EmailService } from "../email/email.service";
import { NotificationGateway } from "../notification/notification.gateway";
export declare class ChatService {
    private readonly emailService;
    private readonly notificationGateway;
    constructor(emailService: EmailService, notificationGateway: NotificationGateway);
    newMessage(data: {
        chatId: string;
        message: string;
    }, userId: string, role: string): Promise<void | {
        from: Types.ObjectId | {
            _id: Types.ObjectId;
        };
        to: Types.ObjectId;
        message: string;
        status: string;
        createdAt: Date;
    }>;
    private inviteCooldown;
    inviteAdmin(id: string): Promise<{
        success: boolean;
    }>;
    confirmInvite(lotId: string, userId: string): Promise<{
        success: boolean;
    }>;
    getUserChat(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/chat.model").Chat & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getChatId(myId: string, userId: string, lotId: string): Promise<Types.ObjectId>;
    getMyChat(userId: string): Promise<{
        ActiveChat: (import("mongoose").Document<unknown, {}, import("src/models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/chat.model").Chat & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        NotActiveChat: (import("mongoose").Document<unknown, {}, import("src/models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/chat.model").Chat & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    getChatHistory(chatId: string, userId: string): Promise<{
        historyMessage: never[];
        numberLot: null;
        history?: undefined;
    } | {
        history: import("mongoose").Document<unknown, {}, import("src/models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/chat.model").Chat & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        historyMessage?: undefined;
        numberLot?: undefined;
    }>;
}
