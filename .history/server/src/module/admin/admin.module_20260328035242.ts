import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";

@Module({
    imports: [UserModule, Lots]
})

export class AdminModule {}