import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductSkuDto {
  @IsString()
  @IsNotEmpty()
  skuName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;


  @IsOptional()
  validity: number;


  @IsOptional()
  lifetime?: boolean;

  @IsOptional()
  stripePriceId?: string;

  @IsOptional()
  skuCode?: string;

  @IsNumber()
  remainingStock: number
}

export class ProductSkuDtoArr {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  skuDetails: ProductSkuDto[];
}