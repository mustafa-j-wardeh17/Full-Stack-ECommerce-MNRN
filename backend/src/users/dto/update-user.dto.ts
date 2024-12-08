import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    oldPassword?: string;

    @IsString()
    @IsOptional()
    newPassword?: string;


}
