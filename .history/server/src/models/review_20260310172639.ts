import { model, Schema, Types} from "mongoose";


export interface ReviewType {
    to: Types.ObjectId,
    from: Types.ObjectId,
    comment: string
    ra
}

const ReviewSchema = new Schema<ReviewType>({
    to: {type:Schema.Types.ObjectId, ref: 'User', required:true},
    from: {type:Schema.Types.ObjectId,ref: 'User', required:true},
    comment: {type:String, required:true},
})

export const ReviewModel = model<ReviewType>('review', ReviewSchema)