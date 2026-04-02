import { Injectable } from "@nestjs/common";
import { TransactionModel } from "src/models/transactions.model";

@Injectable()
export class FinanceService {
    async getAllTransactions () {
        const allTransactions = await TransactionModel.find({})
        .populate('user', 'name avatar')
        .populate('lot', 'name lotNumber images');
        return allTransactions;
    }

    
}