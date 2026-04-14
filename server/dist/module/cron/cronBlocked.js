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
exports.cronBlocked = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const user_model_1 = require("../../models/user.model");
let cronBlocked = class cronBlocked {
    async checkBlocked() {
        try {
            const nowDate = new Date();
            const result = await user_model_1.UserModel.updateMany({
                status: 'Temporary',
                UnblockDate: { $lte: nowDate }
            }, {
                $set: {
                    status: 'No restrictions',
                    UnblockDate: null
                }
            });
            if (result.modifiedCount === 0) {
                console.log('Нет пользователей для разблокировки');
                return;
            }
            console.log(`Разблокировано пользователей: ${result.modifiedCount}`);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.cronBlocked = cronBlocked;
__decorate([
    (0, schedule_1.Cron)('*/1 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], cronBlocked.prototype, "checkBlocked", null);
exports.cronBlocked = cronBlocked = __decorate([
    (0, common_1.Injectable)()
], cronBlocked);
//# sourceMappingURL=cronBlocked.js.map