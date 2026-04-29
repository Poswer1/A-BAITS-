"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const transactions_model_1 = require("../../../models/transactions.model");
const user_model_1 = require("../../../models/user.model");
let FinanceService = class FinanceService {
    async getAllTransactions() {
        const allTransactions = await transactions_model_1.TransactionModel.find({})
            .sort({ createdAt: -1 })
            .populate('user', 'name avatar')
            .populate('lot', 'name lotNumber images author');
        return allTransactions;
    }
    async getMyTransactions(userId, page) {
        const limit = 20;
        const user = await user_model_1.UserModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('userNotFound');
        const [allTransactions, totalTransactions] = await Promise.all([
            await transactions_model_1.TransactionModel.find({ user: userId })
                .sort({ createdAt: -1 })
                .populate('lot', 'images name lotNumber')
                .populate('user', 'avatar name')
                .limit(limit)
                .skip((page - 1) * limit),
            transactions_model_1.TransactionModel.countDocuments({ user: userId })
        ]);
        return { allTransactions: allTransactions, totalTransactions, currentBalance: user.balance };
    }
    async createTransaction(sum, user, type, lot) {
        const createdTransaction = await transactions_model_1.TransactionModel.create({
            lot,
            sum,
            user,
            type
        });
        if (!createdTransaction)
            throw new Error("Transaction creation failed");
        return { success: true };
    }
    async returnMoney(dto) {
        const { from, to, amount } = dto;
        const session = await transactions_model_1.TransactionModel.startSession();
        try {
            session.startTransaction();
            const updateFrom = await user_model_1.UserModel.findByIdAndUpdate(from, { $inc: { balance: -amount } }, { session });
            if (!updateFrom)
                throw new Error('user from not found');
            const updateTo = await user_model_1.UserModel.findByIdAndUpdate(to, { $inc: { balance: amount } }, { session });
            if (!updateTo)
                throw new Error('user to not found');
            const updateTransaction = await transactions_model_1.TransactionModel.findByIdAndUpdate(dto.transactionId, { $set: { status: 'Return' } }, { session });
            if (!updateTransaction)
                throw new Error('transaction not found');
            await session.commitTransaction();
            return { type: updateTransaction.type };
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)()
], FinanceService);
//# sourceMappingURL=finance.service.js.map