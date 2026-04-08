import { IsOptional, IsString } from "class-validator";

export class UpdateProfileDTO {

    @IsString()
    @IsOptional()
    name?:string

    @IsString()
    @IsOptional()
    password?:string

    @IsString()
    @IsOptional()
    email?:string

    @IsString()
    @IsOptional()
    code?:string

    @IsString()
    @IsOptional()
    defaultAvatar?:string

    @IsString()
    @IsOptional()
    location?:string

}
