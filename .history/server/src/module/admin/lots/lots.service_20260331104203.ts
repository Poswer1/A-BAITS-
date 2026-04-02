import { BadRequestException, Injectable } from "@nestjs/common";
import { create } from "domain";
import { LotModel } from "src/models/lot.model";

@Injectable()
export class LotsService {

    getDateRanges () {
        const now = new Date();

        const dateDay = new Date(now);
        dateDay.setDate(now.getDate() - 1);

        const dateWeek = new Date(now);
        dateWeek.setDate(now.getDate() - 7);

        const dateMonth = new Date(now);
        dateMonth.setDate(now.getDate() - 30);

        return { dateDay, dateWeek, dateMonth };
    };

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
        const {dateDay, dateWeek, dateMonth} = this.getDateRanges()
        const lotsCount = await LotModel.aggregate([
            {
                $match: {
                    createdAt: {gte: dateMonth}
                }
            },
            {
                $group: {
                    _id:{ $dateTrunc: { date: "$createdAt", unit: "day" } },
                    // dateTrunc окрулгение даты до нужной еденицы 
                     // тоесть сейчас вернет дату только с днем без часов сек тд
                    value: {$sum: 1} // добовляем +1 за каждого пользователя
                }
            },
        ])
    }

    async getAllTurnover() {
        const {dateDay, dateWeek, dateMonth} = this.getDateRanges()
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
                    value: '$startPrice',
                    createdAt: 1
                    }
                },
            {
                $sort: {createdAt: 1}
            },
            {
                $facet: {
                day: [
                    {$match: {createdAt: { $gte: dateDay }}}
                ],
                week: [
                    {$match: {createdAt: { $gte: dateWeek }}}
                ],
                month: []
                }
            }
            ]);
        return allTurnover[0]
    }
}