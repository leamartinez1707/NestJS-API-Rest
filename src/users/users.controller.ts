import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from 'src/common/role.enum';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Auth(Role.Admin)
  create(@Body() createUserDto: RegisterDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(Role.Admin)

  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(Role.Admin)
  findOne(@Param('id') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  @Auth(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: RegisterDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Auth(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
