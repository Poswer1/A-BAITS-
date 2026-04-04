import { model, Schema, Types} from "mongoose";

export interface TemplatesMessage {
    subject:string,
    html: string,
}

const TemplatesMessageSchema = new Schema<TemplatesMessage>({
    subject: {type:String, required:true},
    html: {type:String, required:true},
}, {timestamps: true})

export const TemplatesMessageModel = model<TemplatesMessage>('TemplatesMessage', TemplatesMessageSchema)