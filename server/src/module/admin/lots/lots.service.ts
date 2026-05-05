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

    async getLotsBySearch(search: string = '', page: number = 1, sort: string = 'createdAt', order: string = 'desc', status: string = '') {
        const limit = 20
        const skip = (Number(page) - 1) * limit
        const sortOrder = order === 'asc' ? 1 : -1
        const sortObj: any = { [sort]: sortOrder }

        const filter: any = {}
        if (search) {
            filter.name = { $regex: search, $options: 'i' }
        }
        if (status) {
            filter.status = status
        }

        const [lots, total] = await Promise.all([
            LotModel.find(filter)
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .populate('author', 'name avatar'),
            LotModel.countDocuments(filter)
        ])
        return { lots, total }
    }
    

    async getLotsCount() {
    const { dateDay, dateWeek, dateMonth } = this.getDateRanges();

    const lotsCount = await LotModel.aggregate([
        {
            $match: {
                createdAt: { $gte: dateMonth } 
            }
        },
        {
            $group: {
                _id: { $dateTrunc: { date: "$createdAt", unit: "day" } },
                value: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                createdAt: "$_id",
                value: 1
            }
        },
        {
            $sort: {
                createdAt: 1
            }
        },
        {
            $facet: {
                day: [ { $match: { createdAt: { $gte: dateDay } } } ],
                week: [ { $match: { createdAt: { $gte: dateWeek } } } ],
                month: []
            }
        }
    ]);

    return lotsCount[0];
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