import { AuthService } from './auth.service';
import { Auth } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: Auth): Promise<import("mongoose").Document<unknown, {}, import("../../models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user.model").User & {
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
            surname: string;
            email: string;
            city?: string;
            balance: number;
            avatar: string;
            role: string;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
}
