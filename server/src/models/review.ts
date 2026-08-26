import { model, Schema, Types} from "mongoose";


export interface ReviewType {
    to: Types.ObjectId,
    from: Types.ObjectId,
    lot: Types.ObjectId,
    comment: string
    rating: number
}

const ReviewSchema = new Schema<ReviewType>({
    to: {type:Schema.Types.ObjectId, ref: 'User', required:true},
    from: {type:Schema.Types.ObjectId,ref: 'User', required:true},
    lot: {type:Schema.Types.ObjectId,ref: 'Lot', required:true},
    comment: {type:String, required:true},
    rating: {type:Number, required:true, default: 0},
}, {timestamps: true})

ReviewSchema.index({ from: 1, to: 1, lot: 1 }, { unique: true })

export const ReviewModel = model<ReviewType>('review', ReviewSchema)