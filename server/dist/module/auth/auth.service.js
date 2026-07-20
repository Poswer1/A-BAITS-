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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("../../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const logging_service_1 = require("../admin/logging/logging.service");
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    configService;
    jwtService;
    loggingService;
    emailService;
    constructor(configService, jwtService, loggingService, emailService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.loggingService = loggingService;
        this.emailService = emailService;
    }
    async register(dto, ip) {
        const normalRegisterEmail = dto.email.trim().toLowerCase();
        const exesting = await user_model_1.UserModel.findOne({ email: normalRegisterEmail });
        if (exesting) {
            throw new common_1.BadRequestException('userExesting');
        }
        const exestingName = await user_model_1.UserModel.findOne({ name: dto.name });
        if (exestingName)
            throw new common_1.BadRequestException('NameIsAlready');
        await this.emailService.comparisonCode(dto.code.toString());
        const password = dto.password;
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        let role = 'user';
        if (dto.adminPassword === this.configService.get('ADMIN_PASSWORD')) {
            role = 'admin';
        }
        try {
            const user = await user_model_1.UserModel.create({
                email: normalRegisterEmail,
                name: dto.name,
                password: hash,
                role: role,
                ip
            });
            await this.loggingService.newLog(user._id.toString(), 'Register');
            return user;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('ErrorRegister');
        }
    }
    async login(dto) {
        const normalEmail = dto.email.trim().toLowerCase();
        const user = await user_model_1.UserModel.findOne({ email: normalEmail });
        if (!user)
            throw new common_1.UnauthorizedException('UserNotFound');
        const isValidPassword = await bcrypt_1.default.compare(dto.password, user.password);
        if (!isValidPassword)
            throw new common_1.UnauthorizedException('dateIsInCorrect');
        const payload = { _id: user._id, role: user.role };
        const token = this.jwtService.sign(payload);
        const { password, ...userData } = user.toObject();
        return { token, userData };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        logging_service_1.LoggingService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map