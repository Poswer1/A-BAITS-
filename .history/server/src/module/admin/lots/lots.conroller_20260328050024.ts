import { Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/module/auth/jwt/jwt-auth-guard";
import { RolesGuard } from "../role.guards";
import { LotsService } from "./lots.service";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('ActionOnTheLots')
export class LotsController {

    constructor(private readonly lotsService:LotsService) {}

    @Get('getLotsBySearch')
    async getLotsBySearch(@Query('search') search:string) {
        return this.lotsService.getLotsBySearch(search)
    }

    @Patch('closeLot/:id')
    async closeLot(@Param('id') id:string) {
        return this.lotsService.closeLot(id)
    }
}