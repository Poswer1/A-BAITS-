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

    async getAllLogs () {
        const allLogs = await LoaggingModel.find({})
        .populate('user', 'avatar name ip')
        .populate('lot', 'lotNumber')
        return allLogs || []
    }
}
