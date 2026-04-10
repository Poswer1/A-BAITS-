import { BadRequestException, Injectable } from '@nestjs/common';
import { getReviewDto, reviewDto } from './review.dto';
import { ReviewModel } from 'src/models/review';
import { UserModel } from 'src/models/user.model';
import { Types } from 'mongoose';
import { ChatModel } from 'src/models/chat.model';
import { ChatGateway } from '../chat/chat.gateway';

@Injectable()
export class ReviewService {

    constructor(private readonly chatGateWay:ChatGateway) {}

    async newReview(userId:string, dto:reviewDto) {

        const {to, comment, rating, lotId} = dto

        const user = await UserModel.findOne({_id: to})
        if(!user) throw new BadRequestException('UserNotFound')

        if(user._id.toString() === userId) throw new BadRequestException('ReviewYourself')
        
        const exestingReview = await ReviewModel.findOne({from:userId, to: user._id, lot: lotId})
        if(exestingReview) throw new BadRequestException('AlreadyReview')

        try {
            await ReviewModel.create(
                {
                    to: user._id,
                    from: userId,
                    lot: lotId,
                    comment: comment,
                    rating: rating
                }
            )
          } catch (error) {
            throw new BadRequestException('errorCreateReview')
        }  

        const allReview = await ReviewModel.countDocuments({to:to})
        const newRating = (user.rating * allReview + rating) / (allReview + 1)
        user.rating = Number(Math.ceil(newRating * 10) / 10)
        await user.save()

        const chat = await ChatModel.findById(dto.lotId)

        if(!chat) {
            console.log('чат не найден')
            return
        }

        chat.reviews.push(new Types.ObjectId(userId));
        chat.messages.push({
            from: new Types.ObjectId('507f1f77bcf86cd799439011'), 
            to: user._id, 
            message: 'NewReview', 
            createdAt: new Date(),
            status: 'user'
        })

        const chatStatus = chat.reviews.some(obj => obj.toString() === user._id.toString())

        if(chatStatus) {
            chat.status = 'Close'
        }

        await chat.save()

        const newMessage = chat.messages[chat.messages.length - 1]
        const chatStatusText = chatStatus ? 'Close' : 'Active'

        this.chatGateWay.newReview(user._id.toString(), newMessage, chatStatusText)

        return {success: true}
    }

    async getReviewUser(query: getReviewDto) {
        const {name, page} = query
        const user = await UserModel.findOne({name:name})
        if(!user) {
            console.log('не найден пользователь при получении отзывов')
            return
        }
        const limit = 4
        const currentPage = Number(page)
        const [allReview, totalReview] = await Promise.all([
            ReviewModel.find({to:user._id})
            .populate('from', 'name avatar')
            .populate('lot', 'images name lotNumber')
            .limit(limit)
            .skip((currentPage - 1) * limit),

            ReviewModel.countDocuments({to: user._id})
        ])

        return {allReview, totalReview}
    }

    async getRandomReview(id:string) {
         const populatedReview = await ReviewModel.findOne({to:id})
        .populate('from', 'name avatar')
        .populate('lot', 'name lotNumber images')

        return populatedReview
    }
}
