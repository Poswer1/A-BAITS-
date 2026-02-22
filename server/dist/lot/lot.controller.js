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
let LotController = class LotController {
    lotService;
    constructor(lotService) {
        this.lotService = lotService;
    }
    async createLot(dto) {
        return this.lotService.createLot(dto);
    }
};
exports.LotController = LotController;
__decorate([
    (0, common_1.Post)('createLot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lot_dto_1.LotDto]),
    __metadata("design:returntype", Promise)
], LotController.prototype, "createLot", null);
exports.LotController = LotController = __decorate([
    (0, common_1.Controller)('lot'),
    __metadata("design:paramtypes", [lot_service_1.LotService])
], LotController);
//# sourceMappingURL=lot.controller.js.map