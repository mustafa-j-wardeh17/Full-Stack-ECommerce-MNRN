import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userTypes } from "src/shared/schema/users";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;


    @IsNotEmpty()
    @IsString()
    email: string;


    @IsNotEmpty()
    @IsString()
    password: string;


    @IsNotEmpty()
    @IsEnum(userTypes)
    type: string;

    @IsString()
    @IsOptional()
    secretToken?: string;

    @IsBoolean()
    @IsOptional()
    isVerified?: boolean
}
