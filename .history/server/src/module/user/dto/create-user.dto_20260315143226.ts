import { IsOptional, IsString } from "class-validator";

export class UpdateProfile {

    @IsString()
    @IsOptional()
    name?:string

    @IsString()
    @IsOptional()
    surname?:string

    @IsString()
    @IsOptional()
    defaultAvatar?:string

    @IsString()
    @IsOptional()
    defaultAvatar?:string

}
