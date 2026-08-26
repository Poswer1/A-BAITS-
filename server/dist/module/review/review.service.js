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
const lot_model_1 = require("../../models/lot.model");
let ReviewService = class ReviewService {
    chatGateWay;
    constructor(chatGateWay) {
        this.chatGateWay = chatGateWay;
    }
    async newReview(userId, dto) {
        const { slug, comment, rating } = dto;
        const currentChat = await chat_model_1.ChatModel.findById(slug);
        if (!currentChat)
            throw new common_1.BadRequestException('ChatNotFound');
        const isParticipant = currentChat.users.some((id) => id.toString() === userId.toString());
        if (!isParticipant)
            throw new common_1.BadRequestException('NotChatParticipant');
        const userToId = currentChat.users.find((id) => id.toString() !== userId.toString());
        if (!userToId)
            throw new common_1.BadRequestException('UserNotFound');
        const user = await user_model_1.UserModel.findOne({ _id: userToId });
        if (!user)
            throw new common_1.BadRequestException('UserNotFound');
        if (user._id.toString() === userId)
            throw new common_1.BadRequestException('ReviewYourself');
        const exestingReview = await review_1.ReviewModel.findOne({ from: userId, to: user._id, lot: currentChat.lot });
        if (exestingReview)
            throw new common_1.BadRequestException('AlreadyReview');
        try {
            await review_1.ReviewModel.create({
                to: user._id,
                from: userId,
                lot: currentChat.lot,
                comment: comment,
                rating: rating
            });
        }
        catch (error) {
            if (error?.code === 11000)
                throw new common_1.BadRequestException('AlreadyReview');
            throw new common_1.BadRequestException('errorCreateReview');
        }
        const [ratingStats] = await review_1.ReviewModel.aggregate([
            { $match: { to: user._id } },
            { $group: { _id: null, average: { $avg: '$rating' } } },
        ]);
        user.rating = Number(Math.ceil((ratingStats?.average ?? rating) * 10) / 10);
        await user.save();
        if (!currentChat.reviews.some((id) => id.toString() === userId.toString())) {
            currentChat.reviews.push(new mongoose_1.Types.ObjectId(userId));
        }
        currentChat.messages.push({
            from: new mongoose_1.Types.ObjectId('507f1f77bcf86cd799439011'),
            to: user._id,
            message: 'NewReview',
            createdAt: new Date(),
            status: 'review'
        });
        const reviewAuthors = await review_1.ReviewModel.distinct('from', {
            lot: currentChat.lot,
            from: { $in: currentChat.users },
            to: { $in: currentChat.users },
        });
        const chatStatus = currentChat.users.length >= 2 &&
            currentChat.users.every((participant) => reviewAuthors.some((author) => author.toString() === participant.toString()));
        if (chatStatus) {
            currentChat.status = 'Close';
            await lot_model_1.LotModel.findByIdAndUpdate({ _id: currentChat.lot, status: 'Sold' }, { $set: { status: 'Archive' } });
        }
        await currentChat.save();
        const newMessage = currentChat.messages[currentChat.messages.length - 1];
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