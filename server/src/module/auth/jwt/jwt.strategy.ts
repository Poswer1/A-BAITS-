import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { // регистрируем в passport с именем jwt  //Strategy это стратегия которая работает с токеном
    constructor(private configService:ConfigService) {
        super({ // super передает данные в родителя в нашем случае в PassportStrategy
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // говорим где искать токен а точне в http запросе в Authorization,
            secretOrKey: configService.get<string>('SECRET_KEY')
        })
    }

    async validate(payload:any) {
        return {_id: payload._id, role: payload.role} //Паспорт сам кладет эти данные в req.user
    }
} 