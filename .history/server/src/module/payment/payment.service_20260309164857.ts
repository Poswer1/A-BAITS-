import { Injectable } from '@nestjs/common';
import { LotModel } from 'src/models/lot.model';

@Injectable()
export class PaymentService {
    async buyLot (userId:string, lotId:string) {
        const lot = await LotModel.findById
    }
}
