import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards, Req, Query } from '@nestjs/common';
import { LotService } from './lot.service';
import { filterLot, getMyLotsDto, LotDto } from './dto/lot.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesInterceptor } from 'src/utils/files-upload';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';



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
  async updateLot(@Req() req: RequestInterface, @Body() dto: LotDto, @Param('id') id:string,  @UploadedFiles() files: Express.Multer.File[], @CurrentUser('id') userId:string) {
    return this.lotService.updateLot(dto, id, files, userId, req.user.role)
  }

  @Get('getAllLot')
  async getAllLot() {
    return this.lotService.getAllLot()
  }

  @Get('getLotByUser')
  async getLotByUser(@Query() query:{name:string, page:number}) {
    return this.lotService.getLotByUser(query)
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
  @Get('myHistoryLot')
  async myHistoryLot(@Req() req: any) {
    const userId = (req.user as any)._id
    return this.lotService.myHistoryLot(userId)
  }

}
