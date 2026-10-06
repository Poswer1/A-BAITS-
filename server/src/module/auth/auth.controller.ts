import { Body, Controller, Get, Post, Res, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './dto/create-auth.dto';
import type { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt/jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: Auth, @Req() req:Request) {
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress
    return this.authService.register(dto, (ip || 'empty'))
  }

  @Get('getStatusAuth')
  getStatusAuth(@Req() req) {
    return {
      isLoggedIn: !!req.cookies.token
    };
  }
  

  @Post('login')
  async login(@Body() dto:Auth, @Res({passthrough: true}) res:Response) {
    const data = await this.authService.login(dto)

    res.cookie('token', data.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // для https
      path: '/',        
      maxAge: 1000 * 60 * 60 * 24 * 30
    })

    return { ok: true, token:data.token}

  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return { ok: true };
  }

}
