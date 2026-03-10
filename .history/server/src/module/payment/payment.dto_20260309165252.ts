import { IsNumber, IsOptional, IsString } from "class-validator";

export class buyLotDto {
    @IsString()
    lotId:string

    @IsNumber()
    @IsOptional()
    price:number
}