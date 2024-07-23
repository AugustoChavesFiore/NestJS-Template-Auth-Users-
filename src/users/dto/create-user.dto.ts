import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Min } from "class-validator";
import { STRONG_PASSWORD_CONST } from "src/common/constans/strongPassword.const";


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString({message: 'The password must be a string'})
    @IsNotEmpty({message: 'The password must not be empty'})
    @IsStrongPassword(STRONG_PASSWORD_CONST.StrongPasswordOptions, {message: STRONG_PASSWORD_CONST.StrongPasswordMessage})
    password: string;
};
