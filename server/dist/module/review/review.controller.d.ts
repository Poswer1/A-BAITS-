import { ReviewService } from './review.service';
import { getReviewDto, reviewDto } from './review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    newReview(dto: reviewDto, req: any): Promise<void>;
    getReviewUser(query: getReviewDto): Promise<{
        allReview: (import("mongoose").Document<unknown, {}, import("../../models/review").ReviewType, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/review").ReviewType & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalReview: number;
    } | undefined>;
    getRandomReview(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models/review").ReviewType, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/review").ReviewType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
