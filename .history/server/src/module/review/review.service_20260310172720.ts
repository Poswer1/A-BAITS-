import { BadRequestException, Injectable } from '@nestjs/common';
import { reviewDto } from './review.dto';
import { ReviewModel } from 'src/models/review';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class ReviewService {
    async newReview(userId:string, dto:reviewDto) {

        const {to, comment} = dto

        const user = await UserModel.findOne({name: to})
        if(!user) throw new BadRequestException('UserNotFound')

        const review = await ReviewModel.create(
            {
                to: user._id,
                from: userId,
                comment: comment
            }
        )
        return review
    }
}
