import { Module } from "@nestjs/common";

@Module({
    providers: [FinanceService],
    controllers: [FinanceController]
})

export class FinanceModule {}