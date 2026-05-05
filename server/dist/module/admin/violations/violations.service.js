"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViolationsService = void 0;
const common_1 = require("@nestjs/common");
const violations_1 = require("../../../models/violations");
let ViolationsService = class ViolationsService {
    async newViolations(user, violations, lot) {
        const query = { user };
        if (lot)
            query.lot = lot;
        const existingViolations = await violations_1.ViolationsModel.findOne(query);
        if (existingViolations) {
            existingViolations.repeated += 1;
            await existingViolations.save();
            return { plusRepeated: true };
        }
        const createViolations = await violations_1.ViolationsModel.create({
            user,
            violations,
            lot,
            repeated: 0
        });
        if (!createViolations)
            throw new common_1.BadRequestException('ErrorCreateViolations');
        return { success: true };
    }
    async getAllViolations(page = 1, sort = 'createdAt', order = 'desc') {
        const limit = 20;
        const skip = (Number(page) - 1) * limit;
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortObj = { [sort]: sortOrder };
        const [violations, total] = await Promise.all([
            violations_1.ViolationsModel.find({})
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .populate('lot', 'images name lotNumber')
                .populate('user', 'avatar name ip status UnblockDate'),
            violations_1.ViolationsModel.countDocuments({})
        ]);
        return { violations, total };
    }
};
exports.ViolationsService = ViolationsService;
exports.ViolationsService = ViolationsService = __decorate([
    (0, common_1.Injectable)()
], ViolationsService);
//# sourceMappingURL=violations.service.js.map