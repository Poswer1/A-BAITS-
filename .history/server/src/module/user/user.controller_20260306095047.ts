import { Controller, Get, Param, Query, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth-guard';


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
}