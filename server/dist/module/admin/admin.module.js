"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const lots_module_1 = require("./lots/lots.module");
const finance_module_1 = require("./finance/finance.module");
const violations_module_1 = require("./violations/violations.module");
const logging_module_1 = require("./logging/logging.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, lots_module_1.LotsModule, finance_module_1.FinanceModule, violations_module_1.ViolationsModule, logging_module_1.LoggingModule]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map