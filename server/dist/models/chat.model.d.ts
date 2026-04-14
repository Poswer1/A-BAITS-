import { Document, Types } from "mongoose";
export interface Message {
    from: Types.ObjectId;
    to: Types.ObjectId;
    message: string;
    status: string;
    createdAt: Date;
}
export interface Chat extends Document {
    users: Types.ObjectId[];
    type: string;
    lot: Types.ObjectId;
    status: string;
    reviews: Types.ObjectId[];
    messages: Message[];
}
export declare const ChatModel: import("mongoose").Model<Chat, {}, {}, {}, Document<unknown, {}, Chat, {}, import("mongoose").DefaultSchemaOptions> & Chat & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Chat>;
