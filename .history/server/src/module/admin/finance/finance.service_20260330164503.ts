import { Injectable } from "@nestjs/common";
import { TransactionModel } from "src/models/transactions.model";
import { ReturnMoneyDto } from "./finance.dto";

@Injectable()
export class FinanceService {

    async getAllTransactions () {
        const allTransactions = await TransactionModel.find({})
        .populate('user', 'name avatar')
        .populate('lot', 'name lotNumber images');
        return allTransactions;
    }

    async returnMoney (dto:ReturnMoneyDto) {
        const { from, to, amount } = dto;
        const session = await TransactionModel.startSession();
        try {
            
        } catch (error) {
            
        }
    }
}