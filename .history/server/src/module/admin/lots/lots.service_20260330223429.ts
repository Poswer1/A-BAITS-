import { BadRequestException, Injectable } from "@nestjs/common";
import { LotModel } from "src/models/lot.model";

@Injectable()
export class LotsService {
    async getLotsBySearch(search:string) {
        console.log(search)
        const allLots = await LotModel.find(
            {
                name:{$regex: search, $options: 'i'} // $options игнор регистра $regex как includes
            }
        )
        return allLots
    }
    
    async closeLot(id:string) {
        const close = await LotModel.findByIdAndUpdate(id, {
            $set: {status: 'Archive'}
        })
        if(!close) throw new BadRequestException('errorCloseLot')
        return {status:close.status}
    }

    async getLotsCount() {
        const count = await LotModel.countDocuments({status: 'Active'})
        return count
    }

    async getAllTurnover() {
        const date = new Date()
        date.setDate(date.getDate() - 30)
        const allTurnover = await LotModel.find({
            createdAt: { $gte: date },
            status: 'Completed'
            
        })
    }
}