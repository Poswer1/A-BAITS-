import { BadRequestException, Injectable } from '@nestjs/common';
import { filterLot, getMyLotsDto, LotDto } from './dto/lot.dto';
import { LotModel } from 'src/models/lot.model';
import { ProccessImages } from 'src/utils/files-upload';
import mongoose, { isValidObjectId, Types } from 'mongoose';
import { UserModel } from 'src/models/user.model';
import { SortOrder } from 'mongoose'


@Injectable()

export class LotService {
  async createLot(dto: LotDto, files: Express.Multer.File[], userId:string) {
    
    const user = await UserModel.findByIdAndUpdate(
      
    )

    const images = files ? await ProccessImages(files, '/uploads/lots/') : [] 

    const Nlot = Math.floor(10000000 + Math.random() * 90000000).toString(); //10000000 — минимальное 8-значное число 90000000 — диапазон до 99999999

    const nowDate = new Date()
    const oneDay = 24 * 60 * 60 * 1000
    
    const newDate = new Date(nowDate.getTime() + (oneDay * Number(dto.date)))
    if(dto.dateTime) {
      const [hours, minutes] = dto.dateTime.split(':').map(Number)
      newDate.setHours(hours, minutes, 0, 0)
    }
    

    try {
      const product = await LotModel.create({
        ...dto,
        author: userId,
        images,
        date: newDate,
        dateTime: dto.dateTime,
        lotNumber: Nlot
      })
      return product
    } catch (error) {
      throw new BadRequestException('Не вдалося створити товар',error.message)
    }
  }

  async getAllLot() {
    try {
      const lot = await LotModel.find({})
      return lot 
    } catch (error) {
      throw new BadRequestException('Ошибка при получение всех товаров',error)
    }
  }

  async getLotByUser(query:{name:string, page:number}) {

    const {name, page} = query

    const user = await UserModel.findOne({name:name})
    if(!user) {
      console.log('пользователь не найден при получени товаров по именни')
      return
    }

    const limit = 4
    const currentPage = Number(page) || 1

    const [allLots, totalLots] = await Promise.all([
      await LotModel.find({author: user._id})
      .limit(limit)
      .skip((currentPage - 1) * limit),
      await LotModel.countDocuments({author: user._id})
    ])

    return {allLots, totalLots}
  }

  async getMyLots(query: getMyLotsDto, userId:string) {
    const {status, mode, page} = query

    let filter:any = {}
    const currentPage = Number(page) || 1

    const limit = 4

    if(mode === 'sell' ) {
      filter.author = userId
      if(status)filter.status = status
    } else {
      if(status === 'Active'){
        filter['historyBid.author'] = userId
        filter.status = 'Active'
      }
      if(status === 'Archive'){
        filter['historyBid.author'] = userId
        filter.status = 'Archive'
      }
      if(status === 'Completed') {
        filter.winner = userId
        filter.status = 'Completed'
      }
      if(status === 'Sold') {
        filter.winner = { $ne: userId } // $ne не равняеться
        filter.status = 'Completed'
      }
      if(status === 'Favorite') {
        const user = await UserModel.findById(userId)
        .select('favorites')
          if (user?.favorites?.length) {
            filter._id = { $in: user.favorites }
          } else {
            filter._id = { $in: [] } 
          }
      }
    }
    
    const [allLots, totalLot] = await Promise.all([
        LotModel.find(filter)
        .collation({ locale: 'en', strength: 2 })
        .limit(limit)
        .skip((currentPage - 1) * limit),

        LotModel.countDocuments(filter)
        .collation({ locale: 'en', strength: 2 }),
    ])

    return {allLots, totalLot}
  }

  async getFilterLot(query: filterLot) {

    const {category, subCategory, subSubCategory, city, minPrice, maxPrice, state, sort, search} = query

    let filter:any = {}
    const min = Number(minPrice)
    const max = Number(maxPrice)

    const page = Math.max(Number(query.page) || 1, 1)
    const limit = 10

    let sortOption: Record<string, SortOrder> = { startPrice: 'asc' }
    if(sort) { // asc по возрастанию // desc по убыванию
      sortOption = sort === 'LowToUp' ? { startPrice: 'asc' } : { startPrice: 'desc' }
    }
    
    if(search)filter.$or = [
        { name: { $regex: search, $options: 'i' } },   // поиск по имени, игнорируя регистр
        { lotNumber: search }
    ];
    if(category)filter.category = category
    if(subCategory)filter.subCategory = subCategory
    if(subSubCategory)filter.subSubCategory = subSubCategory
    if(city)filter.location = city
    if (min || max) {
      filter.startPrice = {
        ...(min ? { $gte: min } : {}),
        ...(max ? { $lte: max } : {})
      }
    }
    if (state) {
      const states = Array.isArray(state) ? state : [state]; 
      filter.state = {
        $in: states.map(s => s)
      }
    }
    const [lots, totalLot, maxLots] = await Promise.all([
      LotModel.find(filter)
      .collation({ locale: 'en', strength: 2 }) // регистр игнорируется
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit),

      LotModel.countDocuments(filter)
      .collation({ locale: 'en', strength: 2 }),
      

      LotModel.find(filter)
      .sort({startPrice: 'desc'})
      .collation({ locale: 'en', strength: 2 })
      .limit(1)
    ])

    const maxPriceLot = maxLots[0]?.startPrice || 0

    return {lots, totalLot, maxPriceLot}

  }

  async getLot (numberLot:string) {

    const orQuery:any[] = [{ lotNumber: numberLot }];

    if (isValidObjectId(numberLot)) {
      orQuery.push({ _id: new Types.ObjectId(numberLot) });
    }

    try {
      const lot = await LotModel.findOne({$or: orQuery}).populate('author', 'avatar name rating')
      return lot
    } catch (error) {
       throw new BadRequestException('Ошибка при получение товара',error)
    }
  }

  async myHistoryLot(userId:string) {
    if(!userId) return
    try {
      const myHistoryLot = await LotModel.find({'historyBid.author': userId})
     return myHistoryLot
    } catch (error) {
      throw new BadRequestException('Ошибка при получение истории лотов пользователя',error)
    }
  }

  async placeBid(data: {lotId: string, bid: number}, userId: string) {
    try {
    const lot = await LotModel.findOne({lotNumber: data.lotId})

    if (!lot) {
      throw new BadRequestException('lotNotFound')
    }

    if(lot.winner) {
      throw new BadRequestException('LotAlreadySold')
    }
    
    const minBid = lot.startPrice + lot.stepPrice

    if(data.bid < minBid) {
       throw new BadRequestException(`Минимальная ставка ${minBid}`)
    }

    const user = await UserModel.findById(userId)
    if(!user) {
      throw new BadRequestException('UserNotFound')
    }

   if (user.balance < data.bid) {
      throw new BadRequestException('NoMoney')
    }

    const nowDate = new Date()
    const differenceDate = lot.date.getTime() - nowDate.getTime()
    const fiveMinutes = 300000

    const update = await LotModel.updateOne(
      {
        _id: lot._id,
        winner: { $exists: false },
        startPrice: lot.startPrice
      },
      {
        $set: { 
          startPrice: data.bid,
          ...(differenceDate <= fiveMinutes && {
            date: new Date(lot.date.getTime() + fiveMinutes)
          })
        },
        $push: {
          historyBid: {
            author: new Types.ObjectId(userId),
            currentBid: data.bid
          }
        }
      }
    )

    if (update.modifiedCount === 0) {
      throw new BadRequestException('Ставка уже перебита')
    }

    const updateLot = await LotModel.findById(lot._id)
    .populate('historyBid.author', 'name avatar');

    const lastBidRaw = updateLot?.historyBid[updateLot.historyBid.length - 1]

    if (!lastBidRaw) return null;
    
    const lastBid = {
        authorId: (lastBidRaw.author as any)._id,   
        name: (lastBidRaw.author as any).name,    
        avatar: (lastBidRaw.author as any).avatar,
        currentBid: lastBidRaw.currentBid,        
        dateBid: lastBidRaw.createdAt            
    };

      return {
        lotId: updateLot.lotNumber,
        newPrice: updateLot.startPrice,
        lastBid:lastBid
      }
    } catch (error) {
      throw error
    } 

  }

  async getHistoryBid(lotId:string) {
    const lot = await LotModel.findOne({lotNumber: lotId}).populate('historyBid.author', 'name avatar');
    if(!lot) {
      console.log('лот не найден при получение истории ставок')
      return { historyUser: [] };
    }

    const sortHistory = lot.historyBid.sort((a,b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))

     const historyUser = sortHistory.map(bid => ({
        authorId: bid.author,
        name: (bid.author as any).name,
        avatar: (bid.author as any).avatar,
        currentBid: bid.currentBid,
        dateBid: bid.createdAt
    }));
 
    return {historyUser}
  }

}
