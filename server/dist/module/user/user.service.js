"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../../models/user.model");
const files_upload_1 = require("../../utils/files-upload");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
let UserService = class UserService {
    async getUserById(id) {
        try {
            const user = await user_model_1.UserModel.findById(id).select('-password');
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('Помилка получення профилю');
        }
    }
    async getUserStatus(userId) {
        const statusUser = await user_model_1.UserModel.findById(userId).populate('status UnblockDate');
        if (!statusUser)
            throw new common_1.BadRequestException('userNotFound');
        return { status: statusUser?.status, UnblockDate: statusUser?.UnblockDate };
    }
    async getUserByName(name) {
        try {
            const user = await user_model_1.UserModel.findOne({ name: name }).select('-password -email');
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('Помилка получення профилю');
        }
    }
    async updateProfile(dto, userId, file) {
        const user = await user_model_1.UserModel.findById(userId);
        if (!user) {
            console.log('пользователь не найден при обновление профиля');
            return;
        }
        if (user?.avatar && !user?.avatar.includes('defaultAvatar')) {
            try {
                const filePath = path_1.default.join(process.cwd(), user?.avatar.slice(1));
                await promises_1.default.access(filePath);
                await promises_1.default.unlink(filePath);
            }
            catch (error) {
                console.log('Старого аватара нету');
            }
        }
        const image = file && await (0, files_upload_1.ProccessImages)([file], '/uploads/avatar/');
        const updateUser = await user_model_1.UserModel.findByIdAndUpdate(userId, {
            ...dto,
            ...(image && { avatar: image[0] }),
            ...(!image && dto.defaultAvatar && { avatar: dto.defaultAvatar })
        }, { returnDocument: 'after' });
        if (!updateUser) {
            throw new common_1.BadRequestException('ErrorUpdateUser');
        }
        return updateUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map