import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards, Req, Query, BadRequestException } from '@nestjs/common';
import { LotService } from './lot.service';
import { filterLot, getMyLotsDto, LotDto } from './dto/lot.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesInterceptor } from 'src/utils/files-upload';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import type { Request } from 'express';


@Controller('lot')
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createLot')
  @UseInterceptors(FilesInterceptor('images', 8, ImagesInterceptor('./uploads/lots')))
  async createLot(@Body() dto: LotDto, @UploadedFiles() files: Express.Multer.File[], @CurrentUser('id') userId:string) {
    return this.lotService.createLot(dto, files, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateLot/:id')
  @UseInterceptors(FilesInterceptor('images', 8, ImagesInterceptor('./uploads/lots')))
  async updateLot(@Req() req: Request, @Body('preview') preview:string, @Body() dto: LotDto, @Param('id') id:string,  @UploadedFiles() files: Express.Multer.File[], @CurrentUser('id') userId:string) {
    const previewArray = preview ? JSON.parse(preview) : []
    return this.lotService.updateLot(dto, id, files, previewArray, userId, req.user.role)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('viewsCount/:id')
  async viewsCount(@Param('id') id:string, @CurrentUser('id') userId:string) {
    return this.lotService.viewsCount(id, userId)
  }

  @Get('getAllLot')
  async getAllLot() {
    return this.lotService.getAllLot()
  }

  @Get('getCategoryStats')
  async getCategoryStats() {
    return this.lotService.getCategoryStats()
  }

  @Get('getLotByUser')
  async getLotByUser(@Query() query:{name:string, page:number}) {
    return this.lotService.getLotByUser(query)
  }

  @Get('getTopLot')
  async getTopLot() {
    return this.lotService.getTopLot()
  }
  @Get('getNewLot')
  async getNewLot() {
    return this.lotService.getNewLot()
  }
  @Get('getLotFrom1UAH')
  async getLotFrom1UAH() {
    return this.lotService.getLotFrom1UAH()
  }
  @Get('getPopularLot')
  async getPopularLot() {
    return this.lotService.getPopularLot()
  }

  @UseGuards(JwtAuthGuard)
  @Patch('closeLot/:id')
    async closeLot(@Param('id') id:string) {
    return this.lotService.closeLot(id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteLot/:id')
  async deleteLot(@Param('id') id:string, @Req() req: Request) {
    const {role} = req.user
    if (!role) throw new BadRequestException('RoleNotFound');
    return this.lotService.deleteLot(id, role)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('resumeLot/:id')
  async resumeLot(@Param('id') id:string, @CurrentUser('id') userId:string) {
    return this.lotService.resumeLot(id, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('getMyLots')
  async getMyLots(@Query() query: getMyLotsDto, @CurrentUser('id') userId:string) {
    return this.lotService.getMyLots(query, userId)
  }

  @Get('getFilterLot')
  async getFilterLot(@Query() query:filterLot) {
    return this.lotService.getFilterLot(query)
  }

  @Get('getLot/:numberLot')
  async getLot(@Param('numberLot') numberLot:string) {
    return this.lotService.getLot(numberLot)
  }

  @UseGuards(JwtAuthGuard)
  @Get('getMyAutoBid/:numberLot')
  async getMyAutoBid(@Param('numberLot') numberLot:string, @CurrentUser('id') userId:string) {
    return this.lotService.getMyAutoBid(numberLot, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('myHistoryLot')
  async myHistoryLot(@Req() req: any) {
    const userId = (req.user as any)._id
    return this.lotService.myHistoryLot(userId)
  }

}
