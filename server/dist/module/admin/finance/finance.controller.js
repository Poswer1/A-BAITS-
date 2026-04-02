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
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const role_guards_1 = require("../role.guards");
const jwt_auth_guard_1 = require("../../auth/jwt/jwt-auth-guard");
const finance_service_1 = require("./finance.service");
const finance_dto_1 = require("./finance.dto");
const current_user_decorator_1 = require("../../../decorator/current-user.decorator");
let FinanceController = class FinanceController {
    financeService;
    constructor(financeService) {
        this.financeService = financeService;
    }
    async getAllTransactions() {
        return this.financeService.getAllTransactions();
    }
    async getMyTransactions(userId) {
        return this.financeService.getMyTransactions(userId);
    }
    async returnMoney(dto) {
        return this.financeService.returnMoney(dto);
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.UseGuards)(role_guards_1.RolesGuard),
    (0, common_1.Get)('getAllTransactions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getAllTransactions", null);
__decorate([
    (0, common_1.Get)('getMyTransactions'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getMyTransactions", null);
__decorate([
    (0, common_1.UseGuards)(role_guards_1.RolesGuard),
    (0, common_1.Patch)('returnMoney'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [finance_dto_1.ReturnMoneyDto]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "returnMoney", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('finance'),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
//# sourceMappingURL=finance.controller.js.map