import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";

@UseGuards(JwtAuthGuard)
@Controller('ActionOnTheLots')
export class LotsController {
    @Get('getLotsBySearch')
    async getLotsBySearch() {

    }
}