import { AuthService } from './auth.service';
import { Auth } from './dto/create-auth.dto';
import type { Response } from 'express';
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
    login(dto: Auth, res: Response): Promise<{
        ok: boolean;
    }>;
}
