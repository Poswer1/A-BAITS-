import { Body, Controller, Post, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './dto/create-auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: Auth) {
    return this.authService.register(dto)
  }

  @Post('login')
  async login(@Body() dto:Auth, @Res({passthrough: true}) res:Response) {
    const token = await this.authService.login(dto)

    res.cookie('token', token, {
      httpOnly: true, // httpOnly — чтобы JS не мог читать токен
      secure: false, // говорит что токен можно отпровлять только по https
      sameSite: 'none', // Защищает от CSRF-атак
      path: '/', 
      maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return { ok: true}

  }

}
