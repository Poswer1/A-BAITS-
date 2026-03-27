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
    async changeStatus(id) {
        const user = await user_model_1.UserModel.findById(id);
        if (!user) {
            throw new common_1.BadRequestException('UserNotFound');
        }
        const updatedUser = await user_model_1.UserModel.findByIdAndUpdate(id, { $set: { status: user.status === 'Blocked' ? 'No restrictions' : 'Blocked' } }, { new: true });
        if (!updatedUser) {
            throw new common_1.BadRequestException('UserNotFound');
        }
        return { status: updatedUser.status };
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