import { BadRequestException, Injectable } from '@nestjs/common';
import { ViolationsModel } from 'src/models/violations';

@Injectable()
export class ViolationsService {

    async newViolations(user:string, violations:string, lot?:string) {
        const query: any = { user };
        if (lot) query.lot = lot;
        const existingViolations = await ViolationsModel.findOne(query)
        if(existingViolations) {
            existingViolations.repeated += 1
            await existingViolations.save()
            return {plusRepeated:true}
        }
        const createViolations = await ViolationsModel.create({
            user,
            violations,
            lot,
            repeated: 0
        })
        if(!createViolations) throw new BadRequestException('ErrorCreateViolations')
        return {success:true}
    }

    async getAllViolations(page: number = 1, sort: string = 'createdAt', order: string = 'desc') {
        const limit = 20
        const skip = (Number(page) - 1) * limit
        const sortOrder = order === 'asc' ? 1 : -1
        const sortObj: any = { [sort]: sortOrder }

        const [violations, total] = await Promise.all([
            ViolationsModel.find({})
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .populate('lot', 'images name lotNumber')
                .populate('user', 'avatar name ip status UnblockDate'),
            ViolationsModel.countDocuments({})
        ])
        return { violations, total }
    }

}
