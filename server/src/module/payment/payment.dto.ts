import { IsNumber, IsOptional, IsString } from "class-validator";
import { ClientSession } from "mongoose";

export class BuyLotDto {
    @IsString()
    lotId:string

    @IsNumber()
    @IsOptional()
    price?:number

}