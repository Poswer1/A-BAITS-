import { BadRequestException, Injectable } from "@nestjs/common";
import { create } from "domain";
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
        const dateDay = new Date()
        dateDay.setDate(dateDay.getDate() - 1)
        const dateWeek = new Date()
        dateWeek.setDate(dateWeek.getDate() - 7)
        const dateMonth = new Date()
        dateMonth.setDate(dateMonth.getDate() - 1)
        const allTurnover = await LotModel.aggregate([
            {
                $match: { // $match фильтр
                status: 'Completed',
                winner: { $exists: true },
                createdAt: { $gte: dateMonth } // за последний месяц
                }
            },
            {
                $project: { // $project говорим что остовляем
                    _id: 0, // 0 - убрать, 1 - оставить
                startPrice:1,
                createdAt: 1
                    }
                },
            {
                $facet: {
                day: [
                    {$match: {createdAt: { $gte: dateDay }}}
                ],
                week: [{$match: {createdAt: { $gte: dateWeek }}}],
                month: []
                }
            }
            ]);
        return allTurnover[0]
    }
}