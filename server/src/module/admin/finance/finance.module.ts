import { Module } from "@nestjs/common";
import { FinanceController } from "./finance.controller";
import { FinanceService } from "./finance.service";

@Module({
    providers: [FinanceService],
    controllers: [FinanceController]
})

export class FinanceModule {}