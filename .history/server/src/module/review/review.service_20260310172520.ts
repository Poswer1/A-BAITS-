import { BadRequestException, Injectable } from '@nestjs/common';
import { reviewDto } from './review.dto';
import { ReviewModel } from 'src/models/review';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class ReviewService {
    async newReview(userId:string, dto:reviewDto) {

        {}

        const user = await UserModel.findOne({name: dto.to})
        if(!user) throw new BadRequestException('UserNotFound')

        const review = await ReviewModel.create(
            {
                to: user._id,
                from: userId,
                comment: dto.comment
            }
        )
        return review
    }
}
