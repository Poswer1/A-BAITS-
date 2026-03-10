
 import { Schema, model, Document,Types } from "mongoose";

export interface Message {
    from: Types.ObjectId;
    to:Types.ObjectId;
    message: string;
    read: boolean;
    createdAt:Date
}


 export interface Chat extends Document {
   userFrom: Types.ObjectId,
   userTo: Types.ObjectId,
   type: string,
   lot: string,
   messages: Message[];
 }

 const ChatSchema = new Schema<Chat> (
    {
      userFrom: {type: Schema.Types.ObjectId, ref: "User", required: true},
      userTo: {type: Schema.Types.ObjectId, ref: "User", required: true},
      type: {}
      lot: {type: String},
        messages: [{
         from:{ type: Schema.Types.ObjectId, ref: "User", required: true},
         to:{ type: Schema.Types.ObjectId, ref: "User", required: true},
         message: {type: String, required: true},
         read: {type: Boolean, default: false},
         createdAt: {type:Date, default: new Date()}
        }]
    },
    {timestamps: true}
 )

  export const ChatModel = model<Chat>("Chat", ChatSchema);