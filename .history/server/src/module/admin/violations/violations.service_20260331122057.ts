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

    async getAllViolations() {
        const AllViolations
    }

}
