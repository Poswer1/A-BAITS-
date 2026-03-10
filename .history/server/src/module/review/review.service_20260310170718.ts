import { Injectable } from '@nestjs/common';
import { reviewDto } from './review.dto';

@Injectable()
export class ReviewService {
    async newReview(userId:string, dto:reviewDto) {
        
    }
}
