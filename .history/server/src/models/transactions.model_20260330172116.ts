import { model, Schema, Types} from "mongoose";

export interface TransactionType {
    sum:number,
    type: string,
    lot: Types.ObjectId,
    user: Types.ObjectId,
    status:string
}

const TransactionSchema = new Schema<TransactionType>({
    sum: {type:Number, required:true},
    type: {type:String, required:true},
    status: {type:String, required:false, default: 'Active'},
    lot: {type:Schema.Types.ObjectId, ref: 'Lot', required:true},
    user: {type:Schema.Types.ObjectId,ref: 'User', required:true},
}, {timestamps: true})

export const TransactionModel = model<TransactionType>('transaction', TransactionSchema)