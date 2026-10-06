import { BadRequestException, Injectable } from "@nestjs/common";
import { TransactionModel } from "src/models/transactions.model";
import { ReturnMoneyDto } from "./finance.dto";
import { UserModel } from "src/models/user.model";

@Injectable()
export class FinanceService {

    async getAllTransactions (page: number = 1, sort: string = 'createdAt', order: string = 'desc') {
        const limit = 20
        const skip = (Number(page) - 1) * limit
        const sortOrder = order === 'asc' ? 1 : -1
        const sortObj: any = { [sort]: sortOrder }

        const [transactions, total] = await Promise.all([
            TransactionModel.find({})
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .populate('user', 'name avatar')
                .populate('lot', 'name lotNumber images author'),
            TransactionModel.countDocuments({})
        ])
        return { transactions, total };
    }

    async getMyTransactions(userId:string, page:number) {
        const limit = 20;
        const user = await UserModel.findById(userId)
        if(!user) throw new BadRequestException('userNotFound')
        const [allTransactions, totalTransactions] = await Promise.all([
            await TransactionModel.find({user: userId})
                .sort({createdAt: -1})
                .populate('lot', 'images name lotNumber')
                .populate('user', 'avatar name')
                .limit(limit)
                .skip((page - 1) * limit),

                TransactionModel.countDocuments({user: userId})
        ])

        return {allTransactions:allTransactions, totalTransactions, currentBalance: user.balance}
    }

    async createTransaction(sum:number, user:string, type:string, lot?:string) {
         const createdTransaction = await TransactionModel.create({
            lot,
            sum,
            user,
            type
        })
        if(!createdTransaction)throw new Error("Transaction creation failed");
        return {success:true}
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