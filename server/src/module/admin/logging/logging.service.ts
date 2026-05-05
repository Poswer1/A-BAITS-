import { Injectable } from '@nestjs/common';
import { LoaggingModel } from 'src/models/logging';

@Injectable()
export class LoggingService {

    async newLog (userId:string, action:string, lot?:string) {
        try {
            await LoaggingModel.create({
                user: userId,
                action,
                lot
            })
            return {success:true}
        } catch (error) {
            throw error
        }
    }

    async getAllLogs (page: number = 1, sort: string = 'createdAt', order: string = 'desc') {
        const limit = 20
        const skip = (Number(page) - 1) * limit
        const sortOrder = order === 'asc' ? 1 : -1
        const sortObj: any = { [sort]: sortOrder }

        const [logs, total] = await Promise.all([
            LoaggingModel.find({})
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .populate('user', 'avatar name ip')
                .populate('lot', 'lotNumber'),
            LoaggingModel.countDocuments({})
        ])
        return { logs, total }
    }
}
