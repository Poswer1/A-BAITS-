import { Types } from "mongoose";
export declare class ChatService {
    newMessage(userId: string, data: any): Promise<void | {
        from: Types.ObjectId;
        to: Types.ObjectId;
        message: any;
        read: boolean;
        createdAt: Date;
    }>;
    getMyChat(userId: string): Promise<{
        unReadChats: (import("mongoose").Document<unknown, {}, import("src/models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/chat.model").Chat & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        readChats: (import("mongoose").Document<unknown, {}, import("src/models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/chat.model").Chat & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    readChat(toUserId: string, fromUserId: string, type: string, lot: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/chat.model").Chat & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getChatHistory(toUserId: string, type: string, userId: string, lot: string): Promise<{
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
