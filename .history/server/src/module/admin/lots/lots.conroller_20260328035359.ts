import { Controller, Get, UseGuards } from "@nestjs/common";

@UseGuards()
@Controller('ActionOnTheLots')
export class LotsController {
    @Get('getLotsBySearch')
    async getLotsBySearch() {

    }
}