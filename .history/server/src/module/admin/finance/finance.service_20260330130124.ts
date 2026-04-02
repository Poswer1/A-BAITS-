import { Injectable } from "@nestjs/common";
import { TransactionModel } from "src/models/transactions.model";

@Injectable()
export class FinanceService {
    async getAllTransactions () {
        const allTransactions = await TransactionModel.find();
        return allTransactions;
    }
}