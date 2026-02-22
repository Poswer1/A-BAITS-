import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsDate } from 'class-validator';

export class LotDto {
  @IsString() name: string;
  @IsNumber() startPrice: number;
  @IsString() category: string;
  @IsString() subCategory: string;
  @IsOptional() @IsString() subSubCategory?: string;
  @IsNumber() stepPrice: number;
  @IsOptional() @IsNumber() blitzPrice?: number;
  @IsOptional() @IsNumber() reservPrice?: number;
  @IsOptional() @IsBoolean() autoReExtension?: boolean;
  @IsString() descriptions: string;
  @IsString() state: string;
  @IsDate() date: number;
  @IsNumber() dateTime: string;
  @IsString() location: string;
  @IsString() delivary: string;
  @IsOptional() @IsBoolean() Advertising?: boolean;
}

