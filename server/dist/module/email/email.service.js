"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
const templatesMessage_1 = require("../../models/templatesMessage");
const TemporaryCode_1 = require("../../models/TemporaryCode");
const user_model_1 = require("../../models/user.model");
let EmailService = class EmailService {
    resend = new resend_1.Resend('re_KM6fi1ap_JHxSaNSfZVsF35yBnpX7fvhF');
    async sendEmail(to, subject, html) {
        return this.resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html
        });
    }
    async Newsletter(subject, html) {
        const allUser = await user_model_1.UserModel.find({});
        for (const user of allUser) {
            await this.sendEmail(user.email, subject, html);
        }
        return { success: true };
    }
    async comparisonCode(code) {
        const comparison = await TemporaryCode_1.TempoparyCode.findOne({ code });
        if (!comparison)
            throw new common_1.BadRequestException('WrongCode');
        try {
            await TemporaryCode_1.TempoparyCode.findByIdAndDelete(comparison._id);
        }
        catch (error) {
            throw error;
        }
        return { success: true };
    }
    async sendCode(email) {
        const userExists = await user_model_1.UserModel.findOne({ email: email }, { _id: 1 });
        if (!userExists)
            throw new common_1.BadRequestException('thisEmailNotFound');
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        await this.sendEmail(email, 'Сброс пароля', code);
        try {
            const existsCode = await TemporaryCode_1.TempoparyCode.findOne({ email });
            if (existsCode) {
                await TemporaryCode_1.TempoparyCode.findOneAndUpdate({ email }, { code, createdAt: new Date() });
            }
            else {
                await TemporaryCode_1.TempoparyCode.create({ email, code });
            }
            return { success: true };
        }
        catch (error) {
            throw error;
        }
    }
    async newTemplate(subject, html) {
        try {
            const newTemplate = await templatesMessage_1.TemplatesMessageModel.create({ subject, html });
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException('ErrorCreateTemplate');
        }
    }
    async getAllTemplate() {
        const allTemplate = await templatesMessage_1.TemplatesMessageModel.find({});
        return allTemplate || [];
    }
    async getTemplateById(id) {
        const template = await templatesMessage_1.TemplatesMessageModel.findById(id);
        if (!template)
            throw new common_1.BadRequestException('TemplateNotFound');
        return template;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map