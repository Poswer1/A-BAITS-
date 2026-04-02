import { UserService } from './user.service';
import { UpdateProfileDTO } from './dto/create-user.dto';
import type { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getRoleUser(req: Request & {
        user: {
            role: string;
            token: string;
        };
    }): Promise<{
        role: string;
    }>;
    getUserById(id?: string, userId?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getUser(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getUserByName(name: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateProfile(dto: UpdateProfileDTO, id?: string, userId?: string, file?: Express.Multer.File): Promise<(import("mongoose").Document<unknown, {}, import("../../models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | undefined>;
}
