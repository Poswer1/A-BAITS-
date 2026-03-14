import { IsNumber, IsOptional, IsString } from "class-validator";

export class reviewDto {

    @IsString()
    to:string

    @IsString()
    comment:string

    @IsNumber()
    rating:number
}

export class getReviewDto {
    @IsString()
    name: string

    @IsNumber()
    @IsOptional()
    page?:number
}