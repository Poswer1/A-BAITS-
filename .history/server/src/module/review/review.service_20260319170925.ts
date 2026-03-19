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

        const {to, comment, rating} = dto

        const user = await UserModel.findOne({_id: to})
        if(!user) throw new BadRequestException('UserNotFound')

        if(user._id.toString() === userId) throw new BadRequestException('ReviewYourself')
        
        const exestingReview = await ReviewModel.findOne({from:userId, to: user._id})
        if(exestingReview) throw new BadRequestException('AlreadyReview')

        const review = await ReviewModel.create(
            {
                to: user._id,
                from: userId,
                comment: comment,
                rating: rating
            }
        )

        const chat = await ChatModel.findOne(
            {
                $or: [
                {userFrom: userId, userTo: user._id},
                {userFrom: user._id, userTo: userId}
            ],
            type: 'deal'
            }
        )

        if(!chat) {
            console.log('чат не найден')
            return
        }

        chat.reviews.push({from: new Types.ObjectId(userId), to: user._id})

        const chatStatus = chat.reviews.some(obj => obj.to.toString() === userId)

        if(chatStatus) {
            chat.status = 'Close'
        }

        chat.messages.push({from: new Types.ObjectId('SYSTEM'), to: user._id, message: 'NewReview', createdAt: new Date()})

        await chat.save()

        this.chatGateWay.newReview(user._id.toString())

        return
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
            .limit(limit)
            .skip((currentPage - 1) * limit),

            ReviewModel.countDocuments({to: user._id})
        ])

        return {allReview, totalReview}
    }

    async getRandomReview(id:string) {
         const populatedReview = await ReviewModel.findOne({to:id})
        .populate('from', 'name avatar')

        return populatedReview
    }
}
