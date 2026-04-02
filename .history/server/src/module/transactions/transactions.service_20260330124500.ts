import { Injectable } from "@nestjs/common";
import { TransactionModel } from "src/models/transactions.model";

@Injectable()
export class TransactionsService {
    async create(lot:string, sum:number, user:string) {
        const createawait TransactionModel.create({
            lot,
            sum,
            user
        })

    }
}