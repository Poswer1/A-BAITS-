import { model, Schema, Types} from "mongoose";

export interface TransactionType {
    sum:number,
    type: 'Charge' | 'buy',
    lot: Types.ObjectId,
    user: Types.ObjectId,
}

const TransactionSchema = new Schema<TransactionType>({
    sum: {type:Number, required:true},
    lot: {type:Schema.Types.ObjectId, ref: 'Lot', required:true},
    user: {type:Schema.Types.ObjectId,ref: 'User', required:true},
}, {timestamps: true})

export const TransactionModel = model<TransactionType>('transaction', TransactionSchema)