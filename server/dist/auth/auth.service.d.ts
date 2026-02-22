import { Auth } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private configService;
    private jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    register(dto: Auth): Promise<import("mongoose").Document<unknown, {}, import("src/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    login(dto: Auth): Promise<{
        token: string;
        userData: {
            name: string;
            email: string;
            balance: number;
            avatar: string;
            role: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
}
