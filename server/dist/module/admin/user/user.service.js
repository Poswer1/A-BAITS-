"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../../../models/user.model");
let UserService = class UserService {
    async getAllUser() {
        try {
            const listUser = await user_model_1.UserModel.find({});
            return listUser;
        }
        catch (error) {
            throw new common_1.BadRequestException('ErrorGetListUser');
        }
    }
    async getAllUserCount() {
        const countUser = await user_model_1.UserModel.countDocuments();
        return countUser;
    }
    async getCountRegisteredUsers() {
        const dateDay = new Date();
        dateDay.setDate(dateDay.getDate() - 1);
        const dateWeek = new Date();
        dateWeek.setDate(dateWeek.getDate() - 7);
        const dateMonth = new Date();
        dateMonth.setDate(dateMonth.getDate() - 30);
        const countUser = await user_model_1.UserModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: dateMonth }
                }
            },
            {
                $group: {
                    _id: { $dateTrunc: { date: "$createdAt", unit: "day" } },
                    value: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    createdAt: '$_id',
                    value: 1
                }
            },
            {
                $sort: { createdAt: 1 }
            },
            {
                $facet: {
                    day: [{ $match: { createdAt: { $gte: dateDay } } }],
                    week: [{ $match: { createdAt: { $gte: dateWeek } } }],
                    month: []
                }
            }
        ]);
        return countUser[0];
    }
    async updateBalance(id, balance) {
        const updateBalnce = await user_model_1.UserModel.findByIdAndUpdate(id, { $inc: { balance: balance } }, { returnDocument: 'after' });
        if (!updateBalnce)
            throw new common_1.BadRequestException('UpateBalanceError');
        return { balance: updateBalnce.balance };
    }
    async changeStatus(id) {
        const user = await user_model_1.UserModel.findById(id);
        if (!user) {
            throw new common_1.BadRequestException('UserNotFound');
        }
        const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(id, { $set: { status: user.status === 'Blocked' ? 'No restrictions' : 'Blocked' } }, { returnDocument: 'after' });
        if (!updatedUser) {
            throw new common_1.BadRequestException('UserNotFound');
        }
        return { status: updatedUser.status };
    }
    async TemporaryBlock(id, day) {
        const user = await user_model_1.UserModel.findById(id);
        if (!user) {
            throw new common_1.BadRequestException('UserNotFound');
        }
        const now = new Date();
        now.setDate(now.getDate() + (Number(day) || 7));
        const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(id, {
            $set: {
                status: user.status === 'Temporary' ? 'No restrictions' : 'Temporary',
                UnblockDate: user.status === 'Temporary' ? null : now
            }
        }, { returnDocument: 'after' });
        if (!updatedUser) {
            throw new common_1.BadRequestException('UserNotFound');
        }
        return { status: updatedUser.status, unBlockDate: updatedUser.UnblockDate };
    }
    async deleteUser(id) {
        try {
            const deletedUser = await user_model_1.UserModel.findByIdAndDelete(id);
            if (!deletedUser) {
                throw new common_1.BadRequestException('UserNotFound');
            }
            return { success: true };
        }
        catch (error) {
            console.log('error delete user', error);
            throw new common_1.BadRequestException('ErrorDeleteUser');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map