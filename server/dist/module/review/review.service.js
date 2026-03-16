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
        const { to, comment, rating } = dto;
        const user = await user_model_1.UserModel.findOne({ _id: to });
        if (!user)
            throw new common_1.BadRequestException('UserNotFound');
        if (user._id.toString() === userId)
            throw new common_1.BadRequestException('ReviewYourself');
        const exestingReview = await review_1.ReviewModel.findOne({ from: userId, to: user._id });
        if (exestingReview)
            throw new common_1.BadRequestException('AlreadyReview');
        const review = await review_1.ReviewModel.create({
            to: user._id,
            from: userId,
            comment: comment,
            rating: rating
        });
        const chat = await chat_model_1.ChatModel.findOne({
            $or: [
                { userFrom: userId, userTo: user._id },
                { userFrom: user._id, userTo: userId }
            ],
            type: 'deal'
        });
        if (!chat) {
            console.log('чат не найден');
            return;
        }
        chat.reviews.push({ from: new mongoose_1.Types.ObjectId(userId), to: user._id });
        const chatStatus = chat.reviews.some(obj => obj.to.toString() === userId);
        if (chatStatus) {
            chat.status = 'Close';
        }
        await chat.save();
        this.chatGateWay.newReview(user._id.toString());
        return;
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
                .limit(limit)
                .skip((currentPage - 1) * limit),
            review_1.ReviewModel.countDocuments({ to: user._id })
        ]);
        return { allReview, totalReview };
    }
    async getRandomReview(id) {
        const populatedReview = await review_1.ReviewModel.findOne({ to: id })
            .populate('from', 'name avatar');
        return populatedReview;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_gateway_1.ChatGateway])
], ReviewService);
//# sourceMappingURL=review.service.js.map