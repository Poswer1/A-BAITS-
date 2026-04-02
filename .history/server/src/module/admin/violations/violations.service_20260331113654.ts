import { Injectable } from '@nestjs/common';
import { ViolationsModel } from 'src/models/violations';

@Injectable()
export class ViolationsService {

    async newViolations(user:string, violations:string, lot?:string) {
        const existingViolations = await ViolationsModel.findOne({user, lot})
        if(existingViolations) {
            existingViolations.repeated += 1
            await existingViolations.save()
            return {plusRepeated:true}
        }
    }

}
