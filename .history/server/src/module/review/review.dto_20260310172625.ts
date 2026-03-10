import { IsString } from "class-validator";

export class reviewDto {

    @IsString()
    to:string

    @IsString()
    comment:string

    @IsString()
    comment:string
}