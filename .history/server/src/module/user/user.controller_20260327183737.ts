import { Controller, Get, Param, Query, Req, UseGuards, Patch, Body, UseInterceptors, UploadedFile, BadRequestException} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';
import { UpdateProfileDTO } from './dto/create-user.dto';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesInterceptor } from 'src/utils/files-upload';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getUserById')
  async getUserById(@Query('id') id?: string, @CurrentUser('id') userId?:string) {
    const idUser = id ?? userId
    if(!idUser) throw new BadRequestException('UserNotFound');
    return this.userService.getUserById(idUser)
  }

  @Get('getUser/:id')
  async getUser(@Param('id') id:string) {
    return this.userService.getUserById(id)
  }

  @Get('getUserByName/:name')
  async getUserByName(@Param('name') name: string) {
    return this.userService.getUserByName(name)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateProfile')
  @UseInterceptors(FileInterceptor('image', ImagesInterceptor('./uploads/avatar')))
  async updateProfile(@Body() dto: UpdateProfileDTO, @Query('id') id?: string, @CurrentUser('id') userId?:string, @UploadedFile() file: Express.Multer.File) {
    const idUser = id ?? userId
    if(!idUser) throw new BadRequestException('UserNotFound');
    if(!file)throw new BadRequestException('fileNotFound')
    return this.userService.updateProfile(dto, idUser, file)
  }
}