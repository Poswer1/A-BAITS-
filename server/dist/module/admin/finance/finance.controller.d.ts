import { FinanceService } from "./finance.service";
import { ReturnMoneyDto } from "./finance.dto";
export declare class FinanceController {
    private financeService;
    constructor(financeService: FinanceService);
    getAllTransactions(): Promise<(import("mongoose").Document<unknown, {}, import("../../../models/transactions.model").TransactionType, {}, import("mongoose").DefaultSchemaOptions> & import("../../../models/transactions.model").TransactionType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getMyTransactions(userId: string): Promise<{
        allTransactions: (import("mongoose").Document<unknown, {}, import("../../../models/transactions.model").TransactionType, {}, import("mongoose").DefaultSchemaOptions> & import("../../../models/transactions.model").TransactionType & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        currentBalance: number;
    }>;
    returnMoney(dto: ReturnMoneyDto): Promise<{
        type: string;
    }>;
}
