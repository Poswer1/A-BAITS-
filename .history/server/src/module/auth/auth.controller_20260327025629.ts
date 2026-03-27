import { Body, Controller, Get, Post, Res, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './dto/create-auth.dto';
import type { Response, Request} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: Auth) {
    return this.authService.register(dto)
  }

  @Get('getStatusAuth')
  getStatusAuth(@Req() req: Request) {
    let token = req.cookies['token']
    if(!token && req.headers.authorization) {
       const authHeader = req.headers.authorization;
       if(authHeader.startsWith('Bearer ')) {
         token = authHeader.split(' ')[1]
       }
    }
    let isValid = false;
    if(token) {
      isValid = true
    }
    return {isLoggedIn: !!token}
  }

  @Post('login')
  async login(@Body() dto:Auth, @Res({passthrough: true}) res:Response) {
    const data = await this.authService.login(dto)

    // res.cookie('token', data.token, {
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   secure: false, // для https
    //   path: '/',        
    //   maxAge: 1000*60*60*24*7
    // })

    return { ok: true, token:data.token}

  }

}
