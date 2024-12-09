import { IsOptional, IsNumberString } from 'class-validator';

export class GetProductQueryDto {
    @IsOptional()
    search?: string;

    @IsOptional()
    category?: string;

    @IsOptional()
    platformType?: string;

    @IsOptional()
    baseType?: string;

    @IsOptional()
    homepage?: string;

}
