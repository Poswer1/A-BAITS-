import { Document, Types } from "mongoose";
export interface Message {
    from: Types.ObjectId;
    to: Types.ObjectId;
    message: string;
    read: boolean;
    createdAt: Date;
}
export interface ReviewsType {
    from: Types.ObjectId;
    to: Types.ObjectId;
}
export interface Chat extends Document {
    userFrom: Types.ObjectId;
    userTo: Types.ObjectId;
    type: string;
    lot: Types.ObjectId;
    status: string;
    reviews: ReviewsType[];
    messages: Message[];
}
export declare const ChatModel: import("mongoose").Model<Chat, {}, {}, {}, Document<unknown, {}, Chat, {}, import("mongoose").DefaultSchemaOptions> & Chat & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Chat>;
