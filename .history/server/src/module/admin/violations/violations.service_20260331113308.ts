import { Injectable } from '@nestjs/common';
import { ViolationsModel } from 'src/models/violations';

@Injectable()
export class ViolationsService {

    async newViolations(user:string, violations:string, lot?:string) {
        const existingviolations = await ViolationsModel.findOne({user, lot})
    }

}
