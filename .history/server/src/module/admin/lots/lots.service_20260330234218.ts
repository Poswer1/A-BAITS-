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
        const allTurnover = await LotModel.aggregate([
            {
                $match: {
                status: 'Completed',
                winner: { $exists: true },
                createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } // за последний месяц
                }
            },
            {
                $facet: {
                day: [
                    {
                    $match: {
                        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) }
                    }
                    },
                    {
                    $group: {
                        _id: null,
                        total: { $sum: '$startPrice' }
                    }
                    }
                ],
                week: [
                    {
                    $match: {
                        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
                    }
                    },
                    {
                    $group: {
                        _id: null,
                        total: { $sum: '$startPrice' }
                    }
                    }
                ],
                month: [
                    {
                    $group: {
                        _id: null,
                        total: { $sum: '$startPrice' }
                    }
                    }
                ]
                }
            }
            ]);
        const turnover = allTurnover[0]
        return {
            day: {turnover?.day[0].total},
            week: turnover?.week[0]?.total,
            month: turnover?.month[0]?.total
        }
    }
}