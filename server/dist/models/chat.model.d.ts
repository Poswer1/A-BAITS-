import { Document, Types } from "mongoose";
export interface Message {
    from: Types.ObjectId;
    to: Types.ObjectId;
    message: string;
    read: boolean;
    createdAt: Date;
}
export interface Chat extends Document {
    userFrom: Types.ObjectId;
    userTo: Types.ObjectId;
    lot: string;
    messages: Message[];
}
export declare const ChatModel: import("mongoose").Model<Chat, {}, {}, {}, Document<unknown, {}, Chat, {}, import("mongoose").DefaultSchemaOptions> & Chat & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Chat>;
