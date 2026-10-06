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
    async getLotsBySearch(
        @Query('search') search: string = '',
        @Query('page') page: number = 1,
        @Query('sort') sort: string = 'createdAt',
        @Query('order') order: string = 'desc',
        @Query('status') status: string = ''
    ) {
        return this.lotsService.getLotsBySearch(search, page, sort, order, status)
    }

    @Get('getLotsCount')
    async getLotsCount() {
        return this.lotsService.getLotsCount()
    }

    @Get('getAllTurnover')
    async getAllTurnover() {
        return this.lotsService.getAllTurnover()
    }
}