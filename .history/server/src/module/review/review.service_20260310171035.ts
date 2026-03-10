import { Injectable } from '@nestjs/common';
import { reviewDto } from './review.dto';
import { ReviewModel } from 'src/models/review';

@Injectable()
export class ReviewService {
    async newReview(userId:string, dto:reviewDto) {

        const user = await user

        const review = await ReviewModel.create(
            {
                to: dto.to,
                from: userId,
                comment: dto.comment
            }
        )
        return review
    }
}
