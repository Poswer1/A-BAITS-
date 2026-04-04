import { IsString } from "class-validator";

export class SendMessageDto {
    @IsString()
    to:string;

    @IsString()
    subject:string;

    @IsString()
    html:string
}