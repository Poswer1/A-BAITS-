import { FinanceService } from "./finance.service";
import { ReturnMoneyDto } from "./finance.dto";
export declare class FinanceController {
    private financeService;
    constructor(financeService: FinanceService);
    getAllTransactions(page?: number, sort?: string, order?: string): Promise<{
        transactions: (import("mongoose").Document<unknown, {}, import("../../../models/transactions.model").TransactionType, {}, import("mongoose").DefaultSchemaOptions> & import("../../../models/transactions.model").TransactionType & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
    }>;
    getMyTransactions(page: number, userId: string): Promise<{
        allTransactions: (import("mongoose").Document<unknown, {}, import("../../../models/transactions.model").TransactionType, {}, import("mongoose").DefaultSchemaOptions> & import("../../../models/transactions.model").TransactionType & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalTransactions: number;
        currentBalance: number;
    }>;
    returnMoney(dto: ReturnMoneyDto): Promise<{
        type: string;
    }>;
}
