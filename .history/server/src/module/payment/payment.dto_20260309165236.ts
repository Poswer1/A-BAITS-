import { IsOptional, IsString } from "class-validator";

export class buyLotDto {
    @IsString()
    lotId:string

    @IsString()
    @IsOptional()
    
}