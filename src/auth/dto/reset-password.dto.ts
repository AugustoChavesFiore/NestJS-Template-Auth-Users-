import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { STRONG_PASSWORD_CONST } from "src/common/constans/strongPassword.const";


export class PasswordDto {
    
    @IsString({message: 'The password must be a string'})
    @IsNotEmpty({message: 'The password must not be empty'})
    @IsStrongPassword(STRONG_PASSWORD_CONST.StrongPasswordOptions, {message: STRONG_PASSWORD_CONST.StrongPasswordMessage})
    password: string;
};

export class ResetPasswordDto extends PasswordDto {

    @IsString({message: 'The password must be a string'})
    @IsNotEmpty({message: 'The password must not be empty'})
    @IsStrongPassword(STRONG_PASSWORD_CONST.StrongPasswordOptions, {message: STRONG_PASSWORD_CONST.StrongPasswordMessage})
    resetPassword: string;

};