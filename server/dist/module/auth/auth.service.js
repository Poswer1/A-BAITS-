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
let AuthService = class AuthService {
    configService;
    jwtService;
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const exesting = await user_model_1.UserModel.findOne({ email: dto.email });
        if (exesting) {
            throw new common_1.BadRequestException('Такий користувач вже зареєстрований');
        }
        const password = dto.password;
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        let role = 'user';
        if (dto.adminPassword === this.configService.get('ADMIN_PASSWORD')) {
            role = 'admin';
        }
        const normalRegisterEmail = dto.email.trim().toLowerCase();
        try {
            const user = await user_model_1.UserModel.create({
                email: normalRegisterEmail,
                name: normalRegisterEmail,
                password: hash,
                role: role
            });
            return user;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Помилка при реєстрації');
        }
    }
    async login(dto) {
        try {
            const user = await user_model_1.UserModel.findOne({ email: dto.email });
            if (!user)
                throw new common_1.UnauthorizedException('Пользователь не знайден');
            const isValidPassword = await bcrypt_1.default.compare(dto.password, user.password);
            if (!isValidPassword)
                throw new common_1.UnauthorizedException('Данні не вірні');
            const payload = { _id: user._id, role: user.role };
            const token = this.jwtService.sign(payload);
            const { password, ...userData } = user.toObject();
            return { token, userData };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Помилка при вході');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map