import { IsOptional, IsString } from "class-validator";

export class UpdateProfile {

    @IsString()
    @IsOptional()
    name:string

}
