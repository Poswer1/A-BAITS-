import { reviewDto } from './review.dto';
import { ChatGateway } from '../chat/chat.gateway';
export declare class ReviewService {
    private readonly chatGateWay;
    constructor(chatGateWay: ChatGateway);
    newReview(userId: string, dto: reviewDto): Promise<void>;
}
