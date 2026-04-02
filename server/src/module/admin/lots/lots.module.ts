import { Module } from "@nestjs/common";
import { LotsService } from "./lots.service";
import { LotsController } from "./lots.conroller";

@Module({
    providers: [LotsService],
    controllers: [LotsController]
})

export class LotsModule {}