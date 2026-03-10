import { Injectable } from '@nestjs/common';
import { reviewDto } from './review.dto';
import { ReviewModel } from 'src/models/review';

@Injectable()
export class ReviewService {
    async newReview(userId:string, dto:reviewDto) {
        const review = await ReviewModel.create()
    }
}
