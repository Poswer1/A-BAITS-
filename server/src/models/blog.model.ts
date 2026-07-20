 import { Schema, model, Document,Types } from "mongoose";

export interface Blog {
    images:string,
    title:string,
    descriptions:string
    author:Types.ObjectId
}

const BlogSchema = new Schema<Blog>(
    {
        images: {type:String, required:true},
        title: {type:String, required:true},
        author: {type: Schema.Types.ObjectId, ref:'User', required: true},
        descriptions: {type:String, required:true}
    }, {timestamps: true}
)

export const BlogModel = model<Blog>('Blog', BlogSchema)