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
exports.LotController = void 0;
const common_1 = require("@nestjs/common");
const lot_service_1 = require("./lot.service");
const lot_dto_1 = require("./dto/lot.dto");
const platform_express_1 = require("@nestjs/platform-express");
const files_upload_1 = require("../../utils/files-upload");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth-guard");
const current_user_decorator_1 = require("../../decorator/current-user.decorator");
let LotController = class LotController {
    lotService;
    constructor(lotService) {
        this.lotService = lotService;
    }
    async createLot(dto, files, userId) {
        return this.lotService.createLot(dto, files, userId);
    }
    async updateLot(req, preview, dto, id, files, userId) {
        const previewArray = preview ? JSON.parse(preview) : [];
        return this.lotService.updateLot(dto, id, files, previewArray, userId, req.user.role);
    }
    async viewsCount(id, userId) {
        return this.lotService.viewsCount(id, userId);
    }
    async getAllLot() {
        return this.lotService.getAllLot();
    }
    async getLotByUser(query) {
        return this.lotService.getLotByUser(query);
    }
    async getTopLot() {
        return this.lotService.getTopLot();
    }
    async getNewLot() {
        return this.lotService.getNewLot();
    }
    async getLotFrom1UAH() {
        return this.lotService.getLotFrom1UAH();
    }
    async getPopularLot() {
        return this.lotService.getPopularLot();
    }
    async closeLot(id) {
        return this.lotService.closeLot(id);
    }
    async deleteLot(id) {
        return this.lotService.deleteLot(id);
    }
    async resumeLot(id) {
        return this.lotService.resumeLot(id);
    }
    async getMyLots(query, userId) {
        return this.lotService.getMyLots(query, userId);
    }
    async getFilterLot(query) {
        return this.lotService.getFilterLot(query);
    }
    async getLot(numberLot) {
        return this.lotService.getLot(numberLot);
    }
    async getMyAutoBid(numberLot, userId) {
        return this.lotService.getMyAutoBid(numberLot, userId);
    }
    async myHistoryLot(req) {
        const userId = req.user._id;
        return this.lotService.myHistoryLot(userId);
    }
};
exports.LotController = LotController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('createLot'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 8, (0, files_upload_1.ImagesInterceptor)('./uploads/lots'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lot_dto_1.LotDto, Array, String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "createLot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('updateLot/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 8, (0, files_upload_1.ImagesInterceptor)('./uploads/lots'))),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('preview')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Param)('id')),
    __param(4, (0, common_1.UploadedFiles)()),
    __param(5, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, lot_dto_1.LotDto, String, Array, String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "updateLot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('viewsCount/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "viewsCount", null);
__decorate([
    (0, common_1.Get)('getAllLot'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getAllLot", null);
__decorate([
    (0, common_1.Get)('getLotByUser'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getLotByUser", null);
__decorate([
    (0, common_1.Get)('getTopLot'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getTopLot", null);
__decorate([
    (0, common_1.Get)('getNewLot'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getNewLot", null);
__decorate([
    (0, common_1.Get)('getLotFrom1UAH'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getLotFrom1UAH", null);
__decorate([
    (0, common_1.Get)('getPopularLot'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getPopularLot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('closeLot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "closeLot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('deleteLot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "deleteLot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('resumeLot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "resumeLot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getMyLots'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lot_dto_1.getMyLotsDto, String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getMyLots", null);
__decorate([
    (0, common_1.Get)('getFilterLot'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lot_dto_1.filterLot]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getFilterLot", null);
__decorate([
    (0, common_1.Get)('getLot/:numberLot'),
    __param(0, (0, common_1.Param)('numberLot')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getLot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getMyAutoBid/:numberLot'),
    __param(0, (0, common_1.Param)('numberLot')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getMyAutoBid", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('myHistoryLot'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "myHistoryLot", null);
exports.LotController = LotController = __decorate([
    (0, common_1.Controller)('lot'),
    __metadata("design:paramtypes", [lot_service_1.LotService])
], LotController);
//# sourceMappingURL=lot.controller.js.map