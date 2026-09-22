
 import { Schema, model, Document,Types } from "mongoose";

export interface Message {
    from: Types.ObjectId;
    to:Types.ObjectId;
    message: string;
    status:string;
    createdAt:Date;
}

 export interface Chat extends Document {
   users: Types.ObjectId[]
   type: string,
   lot: Types.ObjectId,
   status: string,
   reviews: Types.ObjectId[],
   messages: Message[];
 }

 const ChatSchema = new Schema<Chat> (
    {
      users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      type: {type:String, default: 'default'},
      lot: {type: Schema.Types.ObjectId, ref: "Lot",},
      status: {type:String, default: 'Active'},
      reviews: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      messages: [{
         from:{ type: Schema.Types.ObjectId, ref: "User", required: true},
         to:{ type: Schema.Types.ObjectId, ref: "User", required: true},
         message: {type: String, required: true},
         status: {type:String, default: 'user'},
         createdAt: {type:Date, default: new Date()}
      }],
    },
    {timestamps: true}
 )

  export const ChatModel = model<Chat>("Chat", ChatSchema);