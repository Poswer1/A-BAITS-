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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth-guard");
const create_user_dto_1 = require("./dto/create-user.dto");
const current_user_decorator_1 = require("../../decorator/current-user.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const files_upload_1 = require("../../utils/files-upload");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getRoleUser(req) {
        const { role } = req.user;
        if (!role)
            throw new common_1.BadRequestException('RoleNotFound');
        return { role: role };
    }
    async getUserById(id, userId) {
        const idUser = id ?? userId;
        if (!idUser)
            throw new common_1.BadRequestException('UserNotFound');
        return this.userService.getUserById(idUser);
    }
    async getUserStatus(userId) {
        return this.userService.getUserStatus(userId);
    }
    async getUser(id) {
        return this.userService.getUserById(id);
    }
    async getUserByName(name) {
        return this.userService.getUserByName(name);
    }
    async updatePassword(email, newPassword) {
        return this.userService.updatePassword(email, newPassword);
    }
    async updateProfile(req, dto, id, userId, file) {
        const idUser = id ?? userId;
        const { role } = req.user;
        if (!idUser || !role)
            throw new common_1.BadRequestException('UserNotFound');
        return this.userService.updateProfile(dto, idUser, role, file);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getRoleUser'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRoleUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getUserById'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getUserStatus'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStatus", null);
__decorate([
    (0, common_1.Get)('getUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('getUserByName/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByName", null);
__decorate([
    (0, common_1.Patch)('updatePassword'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('updateProfile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', (0, files_upload_1.ImagesInterceptor)('./uploads/avatar'))),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('id')),
    __param(3, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(4, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.UpdateProfileDTO, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map