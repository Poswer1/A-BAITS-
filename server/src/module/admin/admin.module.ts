import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { LotsModule } from "./lots/lots.module";
import { FinanceModule } from "./finance/finance.module";
import { ViolationsModule } from './violations/violations.module';

@Module({
    imports: [UserModule, LotsModule, FinanceModule, ViolationsModule]
})

export class AdminModule {}