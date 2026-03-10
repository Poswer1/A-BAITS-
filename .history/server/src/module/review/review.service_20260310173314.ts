import { BadRequestException, Injectable } from '@nestjs/common';
import { reviewDto } from './review.dto';
import { ReviewModel } from 'src/models/review';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class ReviewService {
    async newReview(userId:string, dto:reviewDto) {

        const {to, comment, rating} = dto

        const user = await UserModel.findOne({name: to})
        if(!user) throw new BadRequestException('UserNotFound')

        if(to === userId) throw new BadRequestException('UReviewYourself')
        
        const exestingReview = await ReviewModel.findOne({from:userId, to: to})
        if(!)

        const review = await ReviewModel.create(
            {
                to: user._id,
                from: userId,
                comment: comment,
                rating: rating
            }
        )
        return review
    }
}
