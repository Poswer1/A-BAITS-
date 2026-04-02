import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './dto/create-auth.dto';
import { UserModel } from 'src/models/user.model';
import bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private configService:ConfigService,
    private jwtService: JwtService
  ) {} 

  async register (dto: Auth, req:Request, res: Response) {
    const exesting = await UserModel.findOne({email:dto.email})
    if(exesting) { 
      throw new BadRequestException('userExesting')
    }
    const exestingName = await UserModel.findOne({name:dto.name})
    if(exestingName) throw new BadRequestException('NameIsAlready')
    
    const password = dto.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    let role = 'user'

    if(dto.adminPassword === this.configService.get<string>('ADMIN_PASSWORD')) {
      role = 'admin'
    }

    const normalRegisterEmail = dto.email.trim().toLowerCase()

    try {
      const user = await UserModel.create({
        email:normalRegisterEmail,
        name:dto.name,
        password: hash,
        role:role
      }) 
      
      return user
    } catch (error) {
       console.log(error)
       throw new BadRequestException('ErrorRegister')
    }

  }

  async login (dto: Auth) {
    
      const normalEmail = dto.email.trim().toLowerCase()

      const user = await UserModel.findOne({email:normalEmail})
      if(!user) throw new UnauthorizedException('UserNotFound')
      
      const isValidPassword = await bcrypt.compare(dto.password, user.password)
      if(!isValidPassword) throw new UnauthorizedException('dateIsInCorrect')

      const payload = {_id:user._id, role:user.role}
      const token = this.jwtService.sign(payload)
      const { password, ...userData } = user.toObject(); // ... говорят взять всё кроме password и положить в userData
      return {token, userData}

    
  }
}
