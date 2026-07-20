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
exports.ConnectDB = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = __importDefault(require("mongoose"));
let ConnectDB = class ConnectDB {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async onModuleInit() {
        try {
            const uri = this.configService.get('MONGO_URI');
            await mongoose_1.default.connect(uri);
            console.log('✅ MongoDB подключена успешно!');
        }
        catch (error) {
            console.error('❌ Ошибка подключения к MongoDB:', error);
        }
    }
};
exports.ConnectDB = ConnectDB;
exports.ConnectDB = ConnectDB = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConnectDB);
//# sourceMappingURL=connectDB.js.map