import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";
import { RolesGuard } from "../role.guards";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('ActionOnTheLots')
export class LotsController {

    constructor(private readonly lotsService:)

    @Get('getLotsBySearch')
    async getLotsBySearch(@Query('search') search:string) {
        return this.
    }
}