import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserById(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
