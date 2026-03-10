import { IsNumber, IsOptional, IsString } from "class-validator";

export class BuyLotDto {
    @IsString()
    lotId:string

    @IsNumber()
    @IsOptional()
    price?:number
}