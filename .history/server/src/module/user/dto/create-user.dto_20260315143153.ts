import { IsString } from "class-validator";

export class UpdateProfile {

    @IsString()
    name:string

}
