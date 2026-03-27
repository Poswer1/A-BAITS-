import { model, Schema, Types } from "mongoose";

export interface User{
    name:string,
    surname:string,
    email:string,
    city?:string,
    password:string,
    balance:number,
    rating:number,
    location:string,
    status: string
    avatar: string,
    role:string,
    favorites:Types.ObjectId[]
}

const UserSchema = new Schema<User>({
    name: {type:String, required:true},
    surname: {type:String},
    location: {type:String},
    city: {type:String},
    email: {type:String, required:true},
    status: {type: String, default: ''}
    password: {type:String, required:true},
    balance: {type:Number, default: 0},
    role:{type:String, required:true},
    rating: {type:Number, default: 1},
    favorites: {type: [Schema.Types.ObjectId], ref: 'Lot'},
    avatar: {type:String, default: '/uploads/defaultAvatar/avatar1.webp'},
},
{timestamps: true,}
)

export const UserModel = model<User>('User', UserSchema)