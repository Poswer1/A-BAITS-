import { BadRequestException, Injectable } from '@nestjs/common';
import { reviewDto } from './review.dto';
import { ReviewModel } from 'src/models/review';
import { UserModel } from 'src/models/user.model';
import { Types } from 'mongoose';
import { ChatModel } from 'src/models/chat.model';

@Injectable()
export class ReviewService {
    async newReview(userId:string, dto:reviewDto) {

        const {to, comment, rating} = dto

        const user = await UserModel.findOne({name: to})
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

        chat.reviews.push({})

        return review
    }
}
