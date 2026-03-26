import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from "express";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // регистрируем в passport с именем jwt  //Strategy это стратегия которая работает с токеном
    constructor(private configService:ConfigService) {
        super({ // super передает данные в родителя в нашем случае в PassportStrategy
            jwtFromRequest: ExtractJwt.fromExtractors([
            (req: Request) => req?.cookies?.token,// из cookie
            ExtractJwt.fromAuthHeaderAsBearerToken()// из Authorization: Bearer ...
            ]),
            secretOrKey: configService.get<string>('SECRET_KEY')
        })
    }

    async validate(payload:any) {
        console.log('Payload из токена:', payload);
        return {_id: payload._id, role: payload.role} //Паспорт сам кладет эти данные в req.user
    }
} 