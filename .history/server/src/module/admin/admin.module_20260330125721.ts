import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { LotsModule } from "./lots/lots.module";

@Module({
    imports: [UserModule, LotsModule, Finn]
})

export class AdminModule {}