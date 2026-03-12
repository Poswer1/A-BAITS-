import { BadRequestException, Injectable } from '@nestjs/common';
import { filterLot, LotDto } from './dto/lot.dto';
import { LotModel } from 'src/models/lot.model';
import { ProccessImages } from 'src/utils/files-upload';
import { Types } from 'mongoose';
import { UserModel } from 'src/models/user.model';


@Injectable()

export class LotService {
  async createLot(dto: LotDto, files: Express.Multer.File[], userId:string) {
    
    const images = files ? await ProccessImages(files) : []

    const Nlot = Math.floor(10000000 + Math.random() * 90000000).toString(); //10000000 — минимальное 8-значное число 90000000 — диапазон до 99999999

    try {
      const product = await LotModel.create({
        ...dto,
        author: userId,
        images,
        lotNumber: Nlot
      })
      return product
    } catch (error) {
      throw new BadRequestException('Не вдалося створити товар',error)
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

  async getFilterLot(query: filterLot) {

    const {category, subCategory, subSubCategory, city, minPrice, maxPrice, state} = query

    let filter = {}

    if(category)
  }

  async getLot (numberLot:string) {
    try {
      const lot = await LotModel.findOne({lotNumber: numberLot}).populate('author', 'avatar name')
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
    const lot = await LotModel.findOne({lotNumber: data.lotId})

    if (!lot) {
      console.log('лот не найден') 
      return
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
      console.log('пользователь не найден при ставке')
      return
    }

    if(data.bid >= user?.balance) {
      throw new BadRequestException('NoMoney')
    }

    lot.startPrice = data.bid

    lot.historyBid.push({author: new Types.ObjectId(userId), currentBid: data.bid})

    await lot.save()

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
      lotId: lot.lotNumber,
      newPrice: lot.startPrice,
      lastBid:lastBid
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
