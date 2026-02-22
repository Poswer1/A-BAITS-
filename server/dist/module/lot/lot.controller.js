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
let LotController = class LotController {
    lotService;
    constructor(lotService) {
        this.lotService = lotService;
    }
    async createLot(req, dto, files) {
        const userId = req.user._id;
        return this.lotService.createLot(dto, files, userId);
    }
    async getAllLot() {
        return this.lotService.getAllLot();
    }
    async getLot(numberLot) {
        return this.lotService.getLot(numberLot);
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
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lot_dto_1.LotDto, Array]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "createLot", null);
__decorate([
    (0, common_1.Get)('getAllLot'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getAllLot", null);
__decorate([
    (0, common_1.Get)('getLot/:numberLot'),
    __param(0, (0, common_1.Param)('numberLot')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "getLot", null);
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