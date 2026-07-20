import { BadRequestException, Injectable } from '@nestjs/common';
import { filterLot, getMyLotsDto, LotDto } from './dto/lot.dto';
import { LotModel } from 'src/models/lot.model';
import { ProccessImages } from 'src/utils/files-upload';
import mongoose, { isValidObjectId, Types } from 'mongoose';
import { UserModel } from 'src/models/user.model';
import { SortOrder } from 'mongoose'
import { ViolationsService } from '../admin/violations/violations.service';
import { FinanceService } from '../admin/finance/finance.service';
import { LoggingService } from '../admin/logging/logging.service';
import { PaymentService } from '../payment/payment.service';


@Injectable()

export class LotService {

  private buildExpiryDate(nowDate: Date, days: number | string, time?: string) {
    const kyivNow = new Date(nowDate.toLocaleString('en-US', { timeZone: 'Europe/Kyiv' }))
    const offsetMs = nowDate.getTime() - kyivNow.getTime()

    const [hours, minutes] = (time || '21:00').split(':').map(Number)
    const targetDate = new Date(
      kyivNow.getFullYear(),
      kyivNow.getMonth(),
      kyivNow.getDate() + Number(days || 1),
      Number.isFinite(hours) ? hours : 21,
      Number.isFinite(minutes) ? minutes : 0,
      0,
      0
    )

    return new Date(targetDate.getTime() - offsetMs)
  }

  constructor(
    private readonly violationsService:ViolationsService,
    private readonly financeService:FinanceService,
    private readonly loggingService:LoggingService,
    private readonly paymentService:PaymentService
  ) {}

  async createLot(dto: LotDto, files: Express.Multer.File[], userId:string) {
    const delivary: string[] = Array.isArray(dto.delivary)
    ? dto.delivary
    : dto.delivary
    ? [dto.delivary]
    : []
    const images = files ? await ProccessImages(files, '/uploads/lots/') : [] 

    const Nlot = Math.floor(10000000 + Math.random() * 90000000).toString(); //10000000 — минимальное 8-значное число 90000000 — диапазон до 99999999

    const nowDate = new Date()
    const newDate = this.buildExpiryDate(nowDate, dto.date, dto.dateTime)

    const user = await UserModel.findById(userId)
    if(!user) throw new BadRequestException('UserNotFound')
    if(user.balance <= -1) throw new BadRequestException('balanceInTheRed')

    let summaryPrice = 0
    if(dto.Advertising) {
      summaryPrice += 20
    }

    const session = await mongoose.startSession()
      try {
        session.startTransaction()
          if(summaryPrice > 0) {
            const userUpdate = await UserModel.updateOne(
            {
              _id:userId,
              status: 'No restrictions',
              balance: {$gte: summaryPrice},
            },
            {
             $inc: { balance: -summaryPrice }
            },
            {session}
          )
          if(userUpdate.modifiedCount === 0) {
            throw new Error('NoMoney')
          }
        }
      
        const [product] = await LotModel.create( 
          // когда делаем [product] говорим то что берем первый элемент
          //  массива что бы вернуть обьект а не массив на фронт
          [
            {
              ...dto,
              author: userId,
              delivary: delivary,
              images,
              stockPrice: dto.startPrice,
              date: newDate,
              dateTime: dto.dateTime,
              lotNumber: Nlot
            }
          ],
          { session }
        )
        
        await session.commitTransaction()

        try {
          if(summaryPrice > 0) {
            await this.financeService.createTransaction(summaryPrice, userId, 'Debit', product._id.toString())
          }
          await this.loggingService.newLog(userId, 'createLot', product._id.toString())
        } catch (externalError) {
          console.error('Ошибка внешних операций:', externalError);
        }

        return product

    } catch (error:any) {
      await session.abortTransaction()
      console.log(error)
      if(error.message === 'NoMoney') {
        throw new BadRequestException('NoMoney')
      }
      throw new BadRequestException('ErrorCreate')
    } finally {
      session.endSession()
    }
  }

  async closeLot(id:string) {
      const lot = await LotModel.findById(id)

      if (!lot) {
        throw new BadRequestException('LotNotFound')
      }

      if (lot.historyBid && lot.historyBid.length > 0) {
        throw new BadRequestException('LotAlreadyHaveBids')
      }
      const close = await LotModel.findByIdAndUpdate(id, 
        { 
          $set: {status: 'Archive'}
        },
        { returnDocument: 'after' }
    )
      if(!close) throw new BadRequestException('errorCloseLot')
      return {status:close.status}
  }

  async resumeLot(id:string) {
    const lot = await LotModel.findById(id)
    if(!lot) throw new BadRequestException('LotNotFound')
    const durationMs = lot.createdAt ? lot.date.getTime() - lot.createdAt.getTime() : 0
    const nowDate = new Date()
    const newDate = new Date(nowDate.getTime() + durationMs)

    try {
      await LotModel.findByIdAndUpdate(id, {
        $set: {
          status: 'Active',
          date: newDate
        }
      })
      return {success:true}
    } catch (error) {
      throw error
    }
  }

  async deleteLot(id:string, role:string) {
    const lot = await LotModel.findById(id)

    if (!lot) {
      throw new BadRequestException('LotNotFound')
    }

    if (role !== 'admin' && lot.historyBid && lot.historyBid.length > 0) {
      throw new BadRequestException('LotAlreadyHaveBids')
    }

    await lot.deleteOne()

    return { success: true }
  }

  async updateLot(dto: LotDto, id:string, files: Express.Multer.File[], preview: string[], userId:string, role:string) {

      const lot = await LotModel.findOne({
        lotNumber: id,
      })
      if(!lot)throw new BadRequestException('LotNotFound')
      if ((lot?.historyBid?.length ?? 0) > 0 && role !== 'admin')throw new BadRequestException('LotAlreadyHaveBids')
      const newImages = files ? await ProccessImages(files, '/uploads/lots/') : []
      const existingImages = preview || []
      let updatedImages:string[] = existingImages
      if(newImages && newImages.length > 0) {
       updatedImages = [...existingImages, ...newImages]
      }
      

      const nowDate = new Date()
      const newDate = this.buildExpiryDate(nowDate, dto.date, dto.dateTime)


    const updateLot = await LotModel.findOneAndUpdate(
      {
        lotNumber: id,
        author: userId
      },
      {
        ...dto,
        date: newDate,
       images: updatedImages
      }
    )

    if(!updateLot) throw new BadRequestException('ErrorUpdateLot')

    return {success:true}

  }

  async viewsCount(id:string, userId:string) {
    try {
      await LotModel.updateOne(
        {_id:id},
        { $addToSet: { views: userId } } // добавит только если его нету
      )
      return {success: true}
    } catch (error) {
      throw error
    }
  }

  async getAllLot() {
    try {
      const lot = await LotModel.find({})
      return lot 
    } catch (error:any) {
      throw new BadRequestException('Ошибка при получение всех товаров',error)
    }
  }

  async getCategoryStats() {
    try {
      const stats = await LotModel.aggregate([
        { $match: { status: 'Active' } },
        {
          $group: {
            _id: {
              category: '$category',
              subCategory: '$subCategory',
              subSubCategory: '$subSubCategory'
            },
            count: { $sum: 1 }
          }
        }
      ])

      const result: Record<string, { count: number; subcategories: Record<string, { count: number; subSubcategories: Record<string, number> }> }> = {}

      stats.forEach((item) => {
        const category = item._id?.category
        const subCategory = item._id?.subCategory
        const subSubCategory = item._id?.subSubCategory

        if (!category) return

        if (!result[category]) {
          result[category] = { count: 0, subcategories: {} }
        }

        result[category].count += item.count

        if (subCategory) {
          if (!result[category].subcategories[subCategory]) {
            result[category].subcategories[subCategory] = { count: 0, subSubcategories: {} }
          }

          result[category].subcategories[subCategory].count += item.count

          if (subSubCategory) {
            if (!result[category].subcategories[subCategory].subSubcategories[subSubCategory]) {
              result[category].subcategories[subCategory].subSubcategories[subSubCategory] = 0
            }

            result[category].subcategories[subCategory].subSubcategories[subSubCategory] += item.count
          }
        }
      })

      return result
    } catch (error) {
      throw new BadRequestException('Ошибка при получении статистики категорий')
    }
  }

  async getTopLot() {
    try {
      const lot = await LotModel.aggregate([
        { $match: {status:'Active', Advertising: { $eq: true }}},
        { $sample: { size: 4 } } // $sample возьми рандомные 4 лота
      ])
      return lot
    } catch (error) {
      throw new BadRequestException('topLotErrorFound')
    }
  }

  async getLotFrom1UAH() {
    try {
      const lot = await LotModel.aggregate([
        { $match: {status:'Active', stockPrice: 1 } },
        { $sample: { size: 4 } } // $sample возьми рандомные 4 лота
      ])
      return lot
    } catch (error) {
      throw new BadRequestException('topLotErrorFound')
    }
  }

  async getNewLot() {
    try {
      const now = new Date()
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      const lot = await LotModel.aggregate([
        { $match: {status:'Active', createdAt: { $gte: oneDayAgo }} },
        { $sample: { size: 4 } } // $sample возьми рандомные 4 лота
      ])
      return lot
    } catch (error) {
      throw new BadRequestException('topLotErrorFound')
    }
  }

   async getPopularLot() {
    try {
      const lot = await LotModel.aggregate([
        {
          $match: {status:'Active'}
        },
        {
          $addFields: { //$addFields создает новое поле
            viewsCount: {$size: {$ifNull: ['$views', []]}} 
             // $size считаем длину массива просмотров
             // $ifNull если поля views нету или null вернем пустой массив
          }
        },
        {
          $sort: {favoritesCount: -1, viewsCount: -1}
        },
        { $limit: 4 }
      ])
      return lot
    } catch (error) {
      throw new BadRequestException('topLotErrorFound')
    }
  }

  async getLotByUser(query:{name:string, page:number}) {

    const {name, page} = query

    const user = await UserModel.findOne({name:name})
    if(!user) {
      console.log('пользователь не найден при получени товаров по именни')
      return
    }

    const limit = 10
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
    const {status, mode, page, sort} = query

    let filter:any = {}
    const currentPage = Number(page) || 1

    const limit = 10

    if(sort === 'MostBids') {
      filter.historyBid 
    }
    if(mode === 'sell') {
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
        filter['historyBid.author'] = userId
        filter.winner = { $ne: userId }
        filter.status = 'Sold'
      }
      if(status === 'Sold' || status === 'Buying') {
        filter.winner = userId // $ne не равняеться
        filter.status = 'Sold'
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

    let sortOption: Record<string, 1 | -1> = {};

    if (sort === 'Newest') {
      sortOption.date = -1;
    }
    if (sort === 'Oldest') {
      sortOption.date = 1;
    }
    if(sort === 'PriceHigh') {
      sortOption.startPrice = -1
    }
    if(sort === 'PriceLow') {
      sortOption.startPrice = 1
    }
    if(sort === 'moreBids') {
      sortOption.bidCount = 1
    }
    if(sort === 'lessBids') {
      sortOption.bidCount = -1
    }

    const [allLots, totalLot] = await Promise.all([
        LotModel.find(filter)
        .sort(sortOption)
        .collation({ locale: 'en', strength: 2 })
        .limit(limit)
        .skip((currentPage - 1) * limit),

        LotModel.countDocuments(filter)
        .collation({ locale: 'en', strength: 2 }),
    ])

    if (sort === 'MostBids') {
      allLots.sort((a, b) => b.historyBid.length - a.historyBid.length);
    }
    if(sort === 'LeastBids') {
      allLots.sort((a, b) => a.historyBid.length - b.historyBid.length);
    }

    return {allLots, totalLot}
  }

  async getFilterLot(query: filterLot) {

    const {category, subCategory, subSubCategory, city, minPrice, maxPrice, state, sort, search} = query

    let filter: any = {
      status: 'Active'
    }
    const min = Number(minPrice)
    const max = Number(maxPrice)

    const page = Math.max(Number(query.page) || 1, 1)
    const limit = 25

    let sortOption: Record<string, SortOrder> = { startPrice: 'asc' }
    if (sort) {// asc по возрастанию // desc по убыванию
      if (sort === 'LowToUp') {
        sortOption = { startPrice: 'asc' };
      } else if (sort === 'UpToLow') {
        sortOption = { startPrice: 'desc' };
      } else if (sort === 'newFirst') {
        sortOption = { date: 'desc' }; // сначала новые
      } else if (sort === 'oldFirst') {
        sortOption = { date: 'asc' }; // сначала старые
      } else if (sort === 'moreBids') {
        sortOption = { bidCount: 'desc' }; // больше ставок
      } else if (sort === 'lessBids') {
        sortOption = { bidCount: 'asc' }; // меньше ставок
      }
    }

    
    if (search && search.toUpperCase() === 'ALLLOTS') {
    // ничего не добавляем в filter
    } else if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { lotNumber: search }
      ];
    }
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
    } catch (error:any) {
       throw new BadRequestException('Ошибка при получение товара',error)
    }
  }

  async getMyAutoBid(numberLot:string, userId:string) {
    const lot = await LotModel.findOne({lotNumber: numberLot}).select('autoBid')
    if(!lot) throw new BadRequestException('lotNotFound')

    const myAutoBids = lot.autoBid.filter(bid => bid.author.toString() === userId.toString())
    const max = myAutoBids.reduce((highest, bid) => Math.max(highest, bid.max), 0)

    return {max: max || null}
  }

  async myHistoryLot(userId:string) {
    if(!userId) return
    try {
      const myHistoryLot = await LotModel.find({'historyBid.author': userId})
     return myHistoryLot
    } catch (error:any) {
      throw new BadRequestException('Ошибка при получение истории лотов пользователя',error)
    }
  }

  async autoBid(data: {lotId: string, bid: number}, userId: string) {
      const lot = await LotModel.findOne({lotNumber: data.lotId})
      if (!lot) throw new BadRequestException('lotNotFound')
      if(lot.author.toString() === userId.toString()) throw new BadRequestException('bidYourself')
      const lastAuto = (lot.autoBid?.length ?? 0) > 0 ? lot.autoBid[lot.autoBid.length - 1] : null 
      if (lastAuto && lastAuto.author?.toString() === userId.toString()) throw new BadRequestException('lastAutoBidYourself')
      const hasHistory = (lot.historyBid?.length ?? 0) > 0
      const minBid = hasHistory ? lot.startPrice + lot.stepPrice : lot.startPrice

      if(data.bid < minBid) throw new BadRequestException(`Минимальная ставка ${minBid}`)
      
      const user = await UserModel.findById(userId)
      if(!user) throw new BadRequestException('UserNotFound')
      if (user.balance <= -1) throw new BadRequestException('balanceInTheRed')

      // const lastAutoBid = lot.autoBid?.at(-1)

      // if (lastAutoBid?.author.equals(userId)) {
      //   throw new BadRequestException('lastAutoBidYourself')
      // } 

      if ((lot.autoBid?.length ?? 0) === 0) {
        const update = await LotModel.updateOne(
          {
            lotNumber: data.lotId,
            winner: { $exists: false },
            startPrice: lot.startPrice
          },
          {
            $set: { startPrice: minBid },
            $push: {
              autoBid: {
                author: userId,
                max: data.bid
              },
              historyBid: {
                author: userId,
                currentBid: minBid
              }
            }
          }
        )
        if (update.modifiedCount === 0) throw new BadRequestException('errorAutoBid')

        const updateLot = await LotModel.findById(lot._id)
          .populate('historyBid.author', 'name avatar')
        if(!updateLot) throw new BadRequestException('lotNotFound')

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
      }

      const { authorBid, newPrice } = await this.calculateAuctionState(lot.autoBid, userId, data.bid, lot.stepPrice, lot.startPrice, 'autoBid')

      const update = await LotModel.updateOne(
        {
          lotNumber:data.lotId,
          winner: { $exists: false }
        },
        {
          startPrice:newPrice,
          $push: {
            autoBid: {
              author:userId,
              max:data.bid
            },
            historyBid: {
              author: new Types.ObjectId(authorBid),
              currentBid: newPrice
            }
          }
        }
    )
    if (update.modifiedCount === 0) throw new BadRequestException('errorAutoBid')

    const updateLot = await LotModel.findById(lot._id)
    .populate('historyBid.author', 'name avatar')
    if(!updateLot) throw new BadRequestException('lotNotFound')
    
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
  }

  async placeBid(data: {lotId: string, bid: number}, userId: string) {
    try {
    const lot = await LotModel.findOne({lotNumber: data.lotId})

    if (!lot) throw new BadRequestException('lotNotFound')

    if(lot.winner) throw new BadRequestException('LotAlreadySold')

    const lastBidObg = lot.historyBid[lot.historyBid.length - 1];

    if(lot.author.toString() === userId.toString() ) throw new BadRequestException('bidYourself')

    if(lastBidObg?.author.toString() === userId.toString()) throw new BadRequestException('isLeadingBid')

    if(lot.blitzPrice && data.bid >= lot.blitzPrice) {
      const update = await LotModel.updateOne(
        {
          _id: lot._id,
          winner: { $exists: false },
          status: 'Active'
        },
        {
          $set: {
            winner: userId,
            status: 'Sold',
            startPrice: lot.blitzPrice
          },
          $push: {
            historyBid: {
              author: new Types.ObjectId(userId),
              currentBid: lot.blitzPrice
            }
          }
        }
      )

      if (update.modifiedCount === 0) throw new BadRequestException('LotAlreadySold')

      const updateLot = await LotModel.findById(lot._id)
      .populate('historyBid.author', 'name avatar')

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
    }
    
    // Расчет минимальной ставки: если ставок нет - стартовая цена, если есть - текущая цена + шаг
    const minBid = lot.historyBid && lot.historyBid.length > 0 
      ? lot.startPrice + lot.stepPrice 
      : lot.startPrice

    if(data.bid < minBid) {
       throw new BadRequestException(`Минимальная ставка ${minBid}`)
    }

    const user = await UserModel.findById(userId)
    if(!user) throw new BadRequestException('UserNotFound')
    if (user.balance <= -1) throw new BadRequestException('balanceInTheRed')
    

    const { authorBid, newPrice } = await this.calculateAuctionState(lot.autoBid, userId, data.bid, lot.stepPrice, lot.startPrice, 'bid')
    
    const nowDate = new Date()
    const differenceDate = lot.date.getTime() - nowDate.getTime()
    const fiveMinutes = 300000
    const extendDate = new Date(nowDate.getTime() + fiveMinutes)

    const update = await LotModel.updateOne(
      {
        _id: lot._id,
        winner: { $exists: false },
        startPrice: lot.startPrice
      },
      {
        $set: {
          startPrice: newPrice,
          ...(differenceDate <= fiveMinutes && differenceDate >= 0 && {
            date: extendDate
          }),
        },
        $inc: {bidCount: 1},
        $push: {
          historyBid: {
            author: new Types.ObjectId(authorBid),
            currentBid: newPrice
          }
        }
      }
    )

    if (update.modifiedCount === 0) throw new BadRequestException('Ставка уже перебита')

    const updateLot = await LotModel.findById(lot._id)
    .populate('historyBid.author', 'name avatar')

    const lastBidRaw = updateLot?.historyBid[updateLot.historyBid.length - 1]

    if (!lastBidRaw) return null;

    // Проверяем, достигла ли ставка блиц-цены
    if (lot.blitzPrice && lot.blitzPrice > 0 && newPrice >= lot.blitzPrice) {
      try {
        await this.paymentService.buyLot(authorBid, { lotId: lot._id.toString(), price: newPrice });
      } catch (error) {
        console.error('Error buying lot at blitz price:', error);
        // Не выбрасываем ошибку, чтобы не прерывать процесс ставки
      }
    }
    
    const userAuthor = await UserModel.findById(updateLot.author)
    if(!userAuthor) throw new BadRequestException('userAuthorNotfound')
    if(user.ip === userAuthor?.ip) {
      await this.violationsService.newViolations(user?._id.toString(), 'SelfBidding', updateLot?._id.toString())
    }
    
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

 async calculateAuctionState(
  lots: any[],
  userId: string,
  bid: number,
  stepPrice: number,
  startPrice: number,
  mode: 'bid' | 'autoBid'
) {

  const sortedLots = [...(lots ?? [])]
    .filter(lot => typeof lot.max === 'number')
    .sort((a, b) => {

      // Сначала по максимальной ставке
      if (b.max !== a.max) {
        return b.max - a.max;
      }

      // Если max одинаковый —
      // новее ставка = выше приоритет

      const aTime = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const bTime = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return aTime - bTime;
    });

  const top1 = sortedLots[0];
  const top2 = sortedLots[1];

  // Нет ставок
  if (!top1) {
    return {
      authorBid: userId,
      newPrice:
        mode === 'autoBid'
          ? startPrice
          : Math.max(startPrice, bid),
    };
  }

  const top1Max = top1.max;
  const top2Max = top2?.max ?? startPrice;

  // =========================================
  // AUTO BID
  // =========================================

  if (mode === 'autoBid') {

    // Новый автобид становится лидером
    // даже если ставка равна
    if (bid >= top1Max) {
      return {
        authorBid: userId,
        newPrice: Math.min(
          bid,
          top1Max + stepPrice
        ),
      };
    }

    // Старый лидер остаётся
    return {
      authorBid: top1.author,
      newPrice: Math.min(
        top1Max,
        Math.max(top2Max, bid) + stepPrice
      ),
    };
  }

  // =========================================
  // NORMAL BID
  // =========================================

  // Обычная ставка перебивает
  // даже при равенстве
  if (bid >= top1Max) {
    return {
      authorBid: userId,
      newPrice: bid,
    };
  }

  // Автобид лидера отвечает
  return {
    authorBid: top1.author,
    newPrice: Math.min(
      top1Max,
      bid + stepPrice
    ),
  };
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
