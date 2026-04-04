import { UpdateProfileDTO } from './dto/create-user.dto';
export declare class UserService {
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getUserStatus(userId: string): Promise<{
        status: string;
        UnblockDate: Date;
    }>;
    getUserByName(name: string): Promise<(import("mongoose").Document<unknown, {}, import("src/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateProfile(dto: UpdateProfileDTO, userId: string, file?: Express.Multer.File): Promise<(import("mongoose").Document<unknown, {}, import("src/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/user.model").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | undefined>;
}
