import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto, ResetPasswordDto, ForgotPasswordDto, PasswordDto } from './dto';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Get('get-roles')
  getRoles() {
    return (ValidRoles);
  };

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  };

  @Post('register')
  @HttpCode(201)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  };

  @Get('check-auth-status')
  @HttpCode(200)
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  };

  @Patch('change-password')
  @HttpCode(204)
  @Auth()
  changePassword(@GetUser() user: User,
    @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.changePassword(user, resetPasswordDto);
  };

  @Post('forgot-password')
  @HttpCode(200)
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  };

  @Post('reset-password')
  @HttpCode(204)
  @Auth()
  resetPassword(
    @Body() resetPasswordDto: PasswordDto,
    @GetUser() user: User) {
    return this.authService.resetPassword(user, resetPasswordDto);
  };



}
