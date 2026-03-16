import { getReviewDto, reviewDto } from './review.dto';
import { Types } from 'mongoose';
import { ChatGateway } from '../chat/chat.gateway';
export declare class ReviewService {
    private readonly chatGateWay;
    constructor(chatGateWay: ChatGateway);
    newReview(userId: string, dto: reviewDto): Promise<void>;
    getReviewUser(query: getReviewDto): Promise<{
        allReview: (import("mongoose").Document<unknown, {}, import("src/models/review").ReviewType, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/review").ReviewType & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        totalReview: number;
    } | undefined>;
    getRandomReview(id: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/review").ReviewType, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/review").ReviewType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
