import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Role } from 'src/common/role.enum';
import { Auth } from './decorator/auth.decorator';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  // @Get('profile')
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard) // Assuming AuthGuard is implemented to protect this route
  // getProfile(@Req() req: RequestWithUser) {
  //   return req.user; // Placeholder for user profile data
  // }
  @Get('profile')
  @Auth(Role.User) // Use the Auth decorator to protect this route
  getProfile(@Req() req: RequestWithUser) {
    return req.user; // Placeholder for user profile data
  }
}
