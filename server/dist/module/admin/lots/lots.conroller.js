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
exports.LotsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt/jwt-auth-guard");
const role_guards_1 = require("../role.guards");
const lots_service_1 = require("./lots.service");
let LotsController = class LotsController {
    lotsService;
    constructor(lotsService) {
        this.lotsService = lotsService;
    }
    async getLotsBySearch(search = '', page = 1, sort = 'createdAt', order = 'desc', status = '') {
        return this.lotsService.getLotsBySearch(search, page, sort, order, status);
    }
    async getLotsCount() {
        return this.lotsService.getLotsCount();
    }
    async getAllTurnover() {
        return this.lotsService.getAllTurnover();
    }
};
exports.LotsController = LotsController;
__decorate([
    (0, common_1.Get)('getLotsBySearch'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('sort')),
    __param(3, (0, common_1.Query)('order')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], LotsController.prototype, "getLotsBySearch", null);
__decorate([
    (0, common_1.Get)('getLotsCount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotsController.prototype, "getLotsCount", null);
__decorate([
    (0, common_1.Get)('getAllTurnover'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LotsController.prototype, "getAllTurnover", null);
exports.LotsController = LotsController = __decorate([
    (0, common_1.UseGuards)(role_guards_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ActionOnTheLots'),
    __metadata("design:paramtypes", [lots_service_1.LotsService])
], LotsController);
//# sourceMappingURL=lots.conroller.js.map