import { Injectable } from "@nestjs/common";
import { TransactionModel } from "src/models/transactions.model";
import { ReturnMoneyDto } from "./finance.dto";
import { UserModel } from "src/models/user.model";

@Injectable()
export class FinanceService {

    async getAllTransactions () {
        const allTransactions = await TransactionModel.find({})
        .populate('user', 'name avatar')
        .populate('lot', 'name lotNumber images author');
        return allTransactions;
    }

    async getMyTransactions(userId:string) {
        const allTransactions = await TransactionModel.find({user: userId})
        .populate('lot', 'images name lotNumber')
        .populate('user', '')
        return allTransactions
    }

    async returnMoney (dto:ReturnMoneyDto) {
        const { from, to, amount } = dto;
        const session = await TransactionModel.startSession();
        try {
            session.startTransaction();
            const updateFrom = await UserModel.findByIdAndUpdate(
                from,
                { $inc: { balance: -amount } },
                { session }
            );
            if (!updateFrom) throw new Error('user from not found');
            const updateTo = await UserModel.findByIdAndUpdate(
                to,
                { $inc: { balance: amount }},
                { session }
            );
            if (!updateTo) throw new Error('user to not found');
            const updateTransaction = await TransactionModel.findByIdAndUpdate(
                dto.transactionId,
                { $set: { status: 'Return' } },
                { session }
            );
            if (!updateTransaction) throw new Error('transaction not found');
            await session.commitTransaction();
            return {type: updateTransaction.type}
        } catch (error) {
            await session.abortTransaction();
            throw error;
        }
    }
}