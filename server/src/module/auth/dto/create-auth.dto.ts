import { IsEmail, IsString } from "class-validator";

export class Auth {
    @IsEmail()
    email:string

    @IsString()
    password:string

    @IsString()
    adminPassword?:string
}
