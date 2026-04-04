 import { Schema, model, Document,Types } from "mongoose";

export interface Loagging {
    user: Types.ObjectId,
    action:string,
    lot?: Types.ObjectId,
}

const LoaggingSchema = new Schema<Loagging>(
    {
        user: {type: Schema.Types.ObjectId, ref: "User", required: true},
        lot: {type: Schema.Types.ObjectId, ref: "Lot"},
        action: {type:String, required:true},
    }, {timestamps: true}
)

export const LoaggingModel = model<Loagging>('Loagging', LoaggingSchema)