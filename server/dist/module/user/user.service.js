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
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_service_1 = require("../email/email.service");
let UserService = class UserService {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
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
    async updatePassword(email, newPassword) {
        const salt = await bcrypt_1.default.genSalt();
        const hash = await bcrypt_1.default.hash(newPassword, salt);
        const update = await user_model_1.UserModel.updateOne({ email: email }, { password: hash });
        if (update.modifiedCount === 0)
            throw new common_1.BadRequestException('ErrorChagePassword');
        return { success: true };
    }
    async updateProfile(dto, userId, role, file) {
        const user = await user_model_1.UserModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException('пользователь не найден при обновление профиля');
        if ((dto.email !== user.email || dto.password) && role === 'user') {
            if (!dto.code)
                throw new common_1.BadRequestException('EnterCode');
            await this.emailService.comparisonCode(dto.code);
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
        let hash = '';
        if (dto.password) {
            hash = await bcrypt_1.default.hash(dto.password, 10);
        }
        const updateUser = await user_model_1.UserModel.findByIdAndUpdate(userId, {
            ...dto,
            ...(hash && { password: hash }),
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
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map