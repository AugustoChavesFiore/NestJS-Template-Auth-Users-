import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ForgotPasswordDto, LoginUserDto, PasswordDto, RegisterUserDto, ResetPasswordDto } from './dto';
import { User } from 'src/users/entities/user.entity';


export interface Response {
    user: User;
    access_token: string;
};

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { };

    async login(loginUser: LoginUserDto): Promise<Response> {
        const user = await this.usersService.findOneByEmail(loginUser.email);
        if (!user) throw new UnauthorizedException('Invalid email or password');
        const isPasswordValid = await this.usersService.comparePassword(loginUser.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

        const payload = { id: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    };

    async register(registerUser: RegisterUserDto): Promise<Response> {
        const user = await this.usersService.create(registerUser);
        if (!user) throw new BadRequestException('User not created');
        const payload = { id: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    };

    async checkAuthStatus(user: User): Promise<Response> {
        return {
            user,
            access_token: this.jwtService.sign({ id: user.id }),
        };
    };

    async changePassword(user: User, resetPasswordDto: ResetPasswordDto) {
        const { password, resetPassword } = resetPasswordDto;
        const isPasswordValid = await this.usersService.comparePassword(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
        const hashedPassword = await this.usersService.hashPassword(resetPassword);
        await this.usersService.update(user.id, { password: hashedPassword });
    };

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.usersService.findOneByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid email');
        const token = this.jwtService.sign({ id: user.id });
        // Send email with token
        return token;
    };

    async resetPassword(user:User, resetPasswordDto: PasswordDto) {
        const { password } = resetPasswordDto
        const hashedPassword = await this.usersService.hashPassword(password);
        await this.usersService.update(user.id, { password: hashedPassword });
    };

    


}
