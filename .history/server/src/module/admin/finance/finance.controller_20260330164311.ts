import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";
import { FinanceService } from "./finance.service";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('finance') 
export class FinanceController {
    constructor (private financeService: FinanceService) {}

    @Get('getAllTransactions')
    async getAllTransactions () {
        return this.financeService.getAllTransactions();
    }

    @Get('returnMoney')
    async returnMoney (@Body() dto: Retunr) {
        return this.financeService.returnMoney();
    }
}