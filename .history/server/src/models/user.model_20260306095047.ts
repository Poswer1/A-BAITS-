import { model, Schema } from "mongoose";

export interface User{
    name:string,
    surname:string,
    email:string,
    city?:string,
    password:string,
    balance:number,
    avatar: string,
    role:string,
}

const UserSchema = new Schema<User>({
    name: {type:String, required:true},
    surname: {type:String, required:true},
    city: {type:String},
    email: {type:String, required:true},
    password: {type:String, required:true},
    balance: {type:Number, default: 0},
    role:{type:String, required:true},
    avatar: {type:String, default: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid&w=740&q=80'},
},
{timestamps: true,}
)

export const UserModel = model<User>('User', UserSchema)