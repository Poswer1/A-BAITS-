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
exports.ViolationsController = void 0;
const common_1 = require("@nestjs/common");
const violations_service_1 = require("./violations.service");
const role_guards_1 = require("../role.guards");
const jwt_auth_guard_1 = require("../../auth/jwt/jwt-auth-guard");
let ViolationsController = class ViolationsController {
    violationsService;
    constructor(violationsService) {
        this.violationsService = violationsService;
    }
    async getAllViolations() {
        return this.violationsService.getAllViolations();
    }
};
exports.ViolationsController = ViolationsController;
__decorate([
    (0, common_1.Get)('getAllViolations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ViolationsController.prototype, "getAllViolations", null);
exports.ViolationsController = ViolationsController = __decorate([
    (0, common_1.UseGuards)(role_guards_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('violations'),
    __metadata("design:paramtypes", [violations_service_1.ViolationsService])
], ViolationsController);
//# sourceMappingURL=violations.controller.js.map