import { Body, Controller, Get, Patch, Query, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../role.guards";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";
import { FinanceService } from "./finance.service";
import { ReturnMoneyDto } from "./finance.dto";
import { CurrentUser } from "src/decorator/current-user.decorator";

@UseGuards(JwtAuthGuard)
@Controller('finance') 
export class FinanceController {
    constructor (private financeService: FinanceService) {}
    
    @UseGuards(RolesGuard)
    @Get('getAllTransactions')
    async getAllTransactions () {
        return this.financeService.getAllTransactions();
    }

    @Get('getMyTransactions')
    async getMyTransactions(@Query('page') page:number, @CurrentUser('id') userId:string) {
        return this.financeService.getMyTransactions(userId, page)
    }
    
    @UseGuards(RolesGuard)
    @Patch('returnMoney')
    async returnMoney (@Body() dto: ReturnMoneyDto) {
        return this.financeService.returnMoney(dto);
    }
}