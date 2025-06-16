import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const foundUser = await this.usersService.findOneByEmail(email);
    if (foundUser) {
      throw new BadRequestException('User already exists with this email');
    }

    await this.usersService.create({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hash the password
    });

    return 'registered successfully';
  }

  async login({ email, password }: LoginDto) {
    const foundUser = await this.usersService.findOneByEmailWithPassword(email);
    if (!foundUser) {
      throw new NotFoundException('User not found, try again or register');
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    // Retornar JWT Token y Datos del usuario

    const payload = { 
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
     };
    return {
      message: 'Login successful',
      user: payload,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
