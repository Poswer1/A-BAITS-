export declare class UserService {
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
