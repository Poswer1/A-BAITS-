import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUser(page?: number, sort?: string, order?: string, search?: string): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("../../../models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../../models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
    }>;
    getCountRegisteredUsers(): Promise<any>;
    getCountUsers(): Promise<number>;
    changeStatus(id: string): Promise<{
        status: string;
    }>;
    TemporaryBlock(id: string, day: number): Promise<{
        status: string;
        unBlockDate: Date;
    }>;
    updateBalance(balance: number, balanceType: string, id: string): Promise<{
        balance: number;
    }>;
    deleteUser(id: string): Promise<{
        success: boolean;
    }>;
}
