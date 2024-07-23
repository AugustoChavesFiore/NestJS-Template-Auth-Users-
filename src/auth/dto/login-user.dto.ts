
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Min } from "class-validator";


export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString({message: 'The password must be a string'})
    @IsNotEmpty({message: 'The password must not be empty'})
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        },{
            message: 'The password must have a Uppercase, lowercase letter and a number and must be at least 8 characters long'
        }
    )
    password: string;
        
};