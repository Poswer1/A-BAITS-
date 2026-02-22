import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { LotService } from './lot.service';
import { LotDto } from './dto/lot.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesInterceptor } from 'src/utils/files-upload';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';


@Controller('lot')
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createLot')
  @UseInterceptors(FilesInterceptor('images', 8, ImagesInterceptor('./uploads/lots')))
  async createLot(@Req() req: any, @Body() dto: LotDto, @UploadedFiles() files: Express.Multer.File[]) {
    const userId = (req.user as any)._id
    return this.lotService.createLot(dto, files, userId)
  }

  @Get('getAllLot')
  async getAllLot() {
    return this.lotService.getAllLot()
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
