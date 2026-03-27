import { Types } from "mongoose";
export interface User {
    name: string;
    surname: string;
    email: string;
    city?: string;
    password: string;
    balance: number;
    rating: number;
    location: string;
    status: string;
    avatar: string;
    role: string;
    favorites: Types.ObjectId[];
}
export declare const UserModel: import("mongoose").Model<User, {}, {}, {}, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, User>;
