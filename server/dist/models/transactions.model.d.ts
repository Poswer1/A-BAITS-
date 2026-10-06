import { Types } from "mongoose";
export interface TransactionType {
    sum: number;
    type: string;
    lot: Types.ObjectId;
    user: Types.ObjectId;
    status: string;
}
export declare const TransactionModel: import("mongoose").Model<TransactionType, {}, {}, {}, import("mongoose").Document<unknown, {}, TransactionType, {}, import("mongoose").DefaultSchemaOptions> & TransactionType & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TransactionType>;
