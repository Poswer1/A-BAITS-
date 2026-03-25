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

  @IsBoolean() autoReExtension?: boolean;

  @IsString() descriptions: string;
  @IsString() state: string;

  @IsNumber()
  date: number;

  @IsString()
  dateTime: string;

  @IsString() location: string;
  @IsString() delivary: string;

  @IsBoolean() Advertising: boolean;
}

export class getMyLotsDto {
  @IsString()
  status:string

  @IsString()
  mode: string

  @IsNumber()
  @IsOptional()
  page?:number
}

export class filterLot {
  @IsString()
  @IsOptional()
  category?:string

  @IsString()
  @IsOptional()
  subCategory?:string

  @IsString()
  @IsOptional()
  subSubCategory?:string

  @IsString()
  @IsOptional()
  city?:string

  @IsNumber()
  @IsOptional()
  minPrice?:number

  @IsNumber()
  @IsOptional()
  maxPrice?:number

  @IsArray()
  @IsString({ each: true }) // each: true проверяет каждый елемент массива что они строчки
  @IsOptional()
  state?:string[]

  @IsString()
  @IsOptional()
  sort?:string

  @IsString()
  @IsOptional()
  page:number

  @IsString()
  @IsOptional()
  search?:string
}

