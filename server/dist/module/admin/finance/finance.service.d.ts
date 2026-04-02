import { ReturnMoneyDto } from "./finance.dto";
export declare class FinanceService {
    getAllTransactions(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/transactions.model").TransactionType, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/transactions.model").TransactionType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getMyTransactions(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/transactions.model").TransactionType, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/transactions.model").TransactionType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    returnMoney(dto: ReturnMoneyDto): Promise<{
        type: string;
    }>;
}
