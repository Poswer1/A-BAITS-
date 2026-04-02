import { model, Schema, Types} from "mongoose";

export interface TransactionType {
    sum:number,
    lot: Types.ObjectId,
    user: Types.ObjectId,
}