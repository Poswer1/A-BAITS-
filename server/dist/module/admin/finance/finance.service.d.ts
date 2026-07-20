import { ReturnMoneyDto } from "./finance.dto";
export declare class FinanceService {
    getAllTransactions(page?: number, sort?: string, order?: string): Promise<{
        transactions: (import("mongoose").Document<unknown, {}, import("src/models/transactions.model").TransactionType, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/transactions.model").TransactionType & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
    }>;
    getMyTransactions(userId: string, page: number): Promise<{
        allTransactions: (import("mongoose").Document<unknown, {}, import("src/models/transactions.model").TransactionType, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/transactions.model").TransactionType & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalTransactions: number;
        currentBalance: number;
    }>;
    createTransaction(sum: number, user: string, type: string, lot?: string): Promise<{
        success: boolean;
    }>;
    returnMoney(dto: ReturnMoneyDto): Promise<{
        type: string;
    }>;
}
