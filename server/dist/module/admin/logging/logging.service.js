"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingService = void 0;
const common_1 = require("@nestjs/common");
const logging_1 = require("../../../models/logging");
let LoggingService = class LoggingService {
    async newLog(userId, action, lot) {
        try {
            await logging_1.LoaggingModel.create({
                user: userId,
                action,
                lot
            });
            return { success: true };
        }
        catch (error) {
            throw error;
        }
    }
    async getAllLogs(page = 1, sort = 'createdAt', order = 'desc') {
        const limit = 20;
        const skip = (Number(page) - 1) * limit;
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = { [sort]: sortOrder };
        const [logs, total] = await Promise.all([
            logging_1.LoaggingModel.find({})
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .populate('user', 'avatar name ip')
                .populate('lot', 'lotNumber'),
            logging_1.LoaggingModel.countDocuments({})
        ]);
        return { logs, total };
    }
};
exports.LoggingService = LoggingService;
exports.LoggingService = LoggingService = __decorate([
    (0, common_1.Injectable)()
], LoggingService);
//# sourceMappingURL=logging.service.js.map