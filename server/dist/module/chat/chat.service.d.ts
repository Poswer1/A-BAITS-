import { Types } from "mongoose";
export declare class ChatService {
    newMessage(userId: string, data: any): Promise<void | {
        from: Types.ObjectId;
        to: Types.ObjectId;
        message: any;
        read: boolean;
        createdAt: Date;
    }>;
    getMyChat(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/chat.model").Chat, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/chat.model").Chat & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getChatHistory(toUserId: string, type: string, userId: string): Promise<{
        historyMessage: never[];
        numberLot: null;
        type?: undefined;
        hadReview?: undefined;
        status?: undefined;
    } | {
        historyMessage: import("src/models/chat.model").Message[];
        numberLot: string;
        type: string;
        hadReview: boolean;
        status: string;
    }>;
}
