import { Auth } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private configService;
    private jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    register(dto: Auth, ip: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    login(dto: Auth): Promise<{
        token: string;
        userData: {
            ip: string;
            name: string;
            surname: string;
            email: string;
            city?: string;
            balance: number;
            rating: number;
            location: string;
            status: string;
            avatar: string;
            UnblockDate: Date;
            role: string;
            favorites: import("mongoose").Types.ObjectId[];
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
}
