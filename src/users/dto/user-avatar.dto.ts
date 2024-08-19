import { IsNotEmpty, IsString, IsUrl } from "class-validator";



export class UserAvatarDto {
    @IsUrl()
    @IsString()
    @IsNotEmpty()
    avatar: string;

}