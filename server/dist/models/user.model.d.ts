export interface User {
    name: string;
    surname: string;
    email: string;
    city?: string;
    password: string;
    balance: number;
    avatar: string;
    role: string;
}
export declare const UserModel: import("mongoose").Model<User, {}, {}, {}, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, User>;
