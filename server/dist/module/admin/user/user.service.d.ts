export declare class UserService {
    getAllUser(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    changeStatus(id: string): Promise<{
        status: string;
    }>;
    deleteUser(id: string): Promise<{
        success: boolean;
    }>;
}
