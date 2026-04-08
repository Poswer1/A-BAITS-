import { FinanceService } from "../finance/finance.service";
export declare class UserService {
    private readonly financeService;
    constructor(financeService: FinanceService);
    getAllUser(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getAllUserCount(): Promise<number>;
    getCountRegisteredUsers(): Promise<any>;
    updateBalance(id: string, balance: number): Promise<{
        balance: number;
    }>;
    changeStatusLotAfterBlock(id: string, status: string): Promise<void>;
    changeStatus(id: string): Promise<{
        status: string;
    }>;
    TemporaryBlock(id: string, day: number): Promise<{
        status: string;
        unBlockDate: Date;
    }>;
    deleteUser(id: string): Promise<{
        success: boolean;
    }>;
}
