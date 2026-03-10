import { model, Schema, Types} from "mongoose";


export interface ReviewType {
    to: string,
    from: string,
    comment: string
}

const ReviewSchema = new Schema<ReviewType>({
    to: {type:String, required:true},
    from: {type:String, required:true},
    comment: {type:String, required:true},
})

export const ReviewModel = model<ReviewType>('review', ReviewSchema)