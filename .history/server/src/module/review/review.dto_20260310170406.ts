import { IsString } from "class-validator";

export class reviewDto {
    @IsString()
    comment:string
}