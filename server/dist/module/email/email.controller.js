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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth-guard");
const role_guards_1 = require("../admin/role.guards");
const email_dto_1 = require("./email.dto");
let EmailController = class EmailController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async sendEmail(dto) {
        const { to, subject, html } = dto;
        return this.emailService.sendEmail(to, subject, html);
    }
    async newTemplate(subject, html) {
        return this.emailService.newTemplate(subject, html);
    }
    async Newsletter(subject, html) {
        return this.emailService.Newsletter(subject, html);
    }
    async getAllTemplate() {
        return this.emailService.getAllTemplate();
    }
    async getTemplateById(id) {
        return this.emailService.getTemplateById(id);
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('sendEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)('newTemplate'),
    __param(0, (0, common_1.Body)('subject')),
    __param(1, (0, common_1.Body)('html')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "newTemplate", null);
__decorate([
    (0, common_1.Post)('Newsletter'),
    __param(0, (0, common_1.Body)('subject')),
    __param(1, (0, common_1.Body)('html')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "Newsletter", null);
__decorate([
    (0, common_1.Get)('getAllTemplate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getAllTemplate", null);
__decorate([
    (0, common_1.Get)('getTemplateById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "getTemplateById", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.UseGuards)(role_guards_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], EmailController);
//# sourceMappingURL=email.controller.js.map