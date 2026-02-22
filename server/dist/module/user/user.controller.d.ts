import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserById(req: any, id?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/user.model").User & {
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
}
