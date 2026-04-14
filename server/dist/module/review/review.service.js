"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const review_1 = require("../../models/review");
const user_model_1 = require("../../models/user.model");
const mongoose_1 = require("mongoose");
const chat_model_1 = require("../../models/chat.model");
const chat_gateway_1 = require("../chat/chat.gateway");
let ReviewService = class ReviewService {
    chatGateWay;
    constructor(chatGateWay) {
        this.chatGateWay = chatGateWay;
    }
    async newReview(userId, dto) {
        const { to, comment, rating, lotId } = dto;
        const user = await user_model_1.UserModel.findOne({ _id: to });
        if (!user)
            throw new common_1.BadRequestException('UserNotFound');
        if (user._id.toString() === userId)
            throw new common_1.BadRequestException('ReviewYourself');
        const exestingReview = await review_1.ReviewModel.findOne({ from: userId, to: user._id, lot: lotId });
        if (exestingReview)
            throw new common_1.BadRequestException('AlreadyReview');
        try {
            await review_1.ReviewModel.create({
                to: user._id,
                from: userId,
                lot: lotId,
                comment: comment,
                rating: rating
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('errorCreateReview');
        }
        const allReview = await review_1.ReviewModel.countDocuments({ to: to });
        const newRating = (user.rating * allReview + rating) / (allReview + 1);
        user.rating = Number(Math.ceil(newRating * 10) / 10);
        await user.save();
        const chat = await chat_model_1.ChatModel.findById(dto.lotId);
        if (!chat) {
            console.log('чат не найден');
            return;
        }
        chat.reviews.push(new mongoose_1.Types.ObjectId(userId));
        chat.messages.push({
            from: new mongoose_1.Types.ObjectId('507f1f77bcf86cd799439011'),
            to: user._id,
            message: 'NewReview',
            createdAt: new Date(),
            status: 'user'
        });
        const chatStatus = chat.reviews.some(obj => obj.toString() === user._id.toString());
        if (chatStatus) {
            chat.status = 'Close';
        }
        await chat.save();
        const newMessage = chat.messages[chat.messages.length - 1];
        const chatStatusText = chatStatus ? 'Close' : 'Active';
        this.chatGateWay.newReview(user._id.toString(), newMessage, chatStatusText);
        return { success: true };
    }
    async getReviewUser(query) {
        const { name, page } = query;
        const user = await user_model_1.UserModel.findOne({ name: name });
        if (!user) {
            console.log('не найден пользователь при получении отзывов');
            return;
        }
        const limit = 4;
        const currentPage = Number(page);
        const [allReview, totalReview] = await Promise.all([
            review_1.ReviewModel.find({ to: user._id })
                .populate('from', 'name avatar')
                .populate('lot', 'images name lotNumber')
                .limit(limit)
                .skip((currentPage - 1) * limit),
            review_1.ReviewModel.countDocuments({ to: user._id })
        ]);
        return { allReview, totalReview };
    }
    async getRandomReview(id) {
        const populatedReview = await review_1.ReviewModel.findOne({ to: id })
            .populate('from', 'name avatar')
            .populate('lot', 'name lotNumber images');
        return populatedReview;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_gateway_1.ChatGateway])
], ReviewService);
//# sourceMappingURL=review.service.js.map