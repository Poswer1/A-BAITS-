import { Controller, Get, Param, Query, Req, UseGuards, Patch, Body, UseInterceptors} from '@nestjs/common';
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
  async getUserById(@Req() req: any, @Query('id') id?: string) {
    const userId = id ?? (req.user as any)._id;
    return this.userService.getUserById(userId)
  }

  @Get('getUserByName/:name')
  async getUserByName(@Param('name') name: string) {
    return this.userService.getUserByName(name)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateProfile')
  @UseInterceptors(FileInterceptor('image'), ImagesInterceptor)
  async updateProfile(@Body() dto: UpdateProfileDTO, @CurrentUser('id') userId:string) {
    return this.userService.updateProfile(dto, userId)
  }
}