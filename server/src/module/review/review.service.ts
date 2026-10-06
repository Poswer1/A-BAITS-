import { BadRequestException, Injectable } from '@nestjs/common';
import { getReviewDto, reviewDto } from './review.dto';
import { ReviewModel } from 'src/models/review';
import { UserModel } from 'src/models/user.model';
import { Types } from 'mongoose';
import { ChatModel } from 'src/models/chat.model';
import { ChatGateway } from '../chat/chat.gateway';
import { LotModel } from 'src/models/lot.model';

@Injectable()
export class ReviewService {

    constructor(private readonly chatGateWay:ChatGateway) {}

    async newReview(userId:string, dto:reviewDto) {

        const {slug, comment, rating} = dto

        const currentChat = await ChatModel.findById(slug)
        if (!currentChat) throw new BadRequestException('ChatNotFound')

        const isParticipant = currentChat.users.some((id) => id.toString() === userId.toString())
        if (!isParticipant) throw new BadRequestException('NotChatParticipant')

        const userToId = currentChat.users.find(
            (id) => id.toString() !== userId.toString()
        )

        if (!userToId) throw new BadRequestException('UserNotFound')

        const user = await UserModel.findOne({_id: userToId})
        if(!user) throw new BadRequestException('UserNotFound')

        if(user._id.toString() === userId) throw new BadRequestException('ReviewYourself')
        
        const exestingReview = await ReviewModel.findOne({from:userId, to: user._id, lot: currentChat.lot})
        if(exestingReview) throw new BadRequestException('AlreadyReview')

        try {
            await ReviewModel.create(
                {
                    to: user._id,
                    from: userId,
                    lot: currentChat.lot,
                    comment: comment,
                    rating: rating
                }
            )
                    } catch (error: any) {
                        if (error?.code === 11000) throw new BadRequestException('AlreadyReview')
            throw new BadRequestException('errorCreateReview')
        }  

                const [ratingStats] = await ReviewModel.aggregate([
                    { $match: { to: user._id } },
                    { $group: { _id: null, average: { $avg: '$rating' } } },
                ])
                user.rating = Number(Math.ceil((ratingStats?.average ?? rating) * 10) / 10)
        await user.save()

                if (!currentChat.reviews.some((id) => id.toString() === userId.toString())) {
                        currentChat.reviews.push(new Types.ObjectId(userId));
                }
        currentChat.messages.push({
            from: new Types.ObjectId('507f1f77bcf86cd799439011'), 
            to: user._id, 
            message: 'NewReview', 
            createdAt: new Date(),
            status: 'review'
        })

        const reviewAuthors = await ReviewModel.distinct('from', {
            lot: currentChat.lot,
            from: { $in: currentChat.users },
            to: { $in: currentChat.users },
        })
        const chatStatus = currentChat.users.length >= 2 &&
            currentChat.users.every((participant) =>
                reviewAuthors.some((author) => author.toString() === participant.toString())
            )

        if(chatStatus) {
            currentChat.status = 'Close'
            await LotModel.findByIdAndUpdate(
                { _id: currentChat.lot, status: 'Sold' },
                { $set: { status: 'Archive' } }
            )
        }

        await currentChat.save()

        const newMessage = currentChat.messages[currentChat.messages.length - 1]
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
