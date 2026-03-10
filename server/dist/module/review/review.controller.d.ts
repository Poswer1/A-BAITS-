import { ReviewService } from './review.service';
import { reviewDto } from './review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    newReview(dto: reviewDto, req: any): Promise<void>;
}
