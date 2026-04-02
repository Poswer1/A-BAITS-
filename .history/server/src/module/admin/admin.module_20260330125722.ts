import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { LotsModule } from "./lots/lots.module";
import { FinanceModule } from "./finance/finance.module";

@Module({
    imports: [UserModule, LotsModule, FinanceModule]
})

export class AdminModule {}