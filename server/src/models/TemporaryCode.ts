 import { Schema, model, Document,Types } from "mongoose";

export interface TempoparyCode {
    email:string,
    code:string
}

const TempoparyCodeSchema = new Schema<TempoparyCode>(
    {
        email: {type:String, required:true},
        code: {type:String, required:true}
    }, {timestamps: true}
)

export const TempoparyCode = model<TempoparyCode>('TempoparyCode', TempoparyCodeSchema)