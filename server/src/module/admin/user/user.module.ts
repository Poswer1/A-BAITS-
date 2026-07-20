import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { FinanceModule } from "../finance/finance.module";

@Module({
    imports: [FinanceModule],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}
