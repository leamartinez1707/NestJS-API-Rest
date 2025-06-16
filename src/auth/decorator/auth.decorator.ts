import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/common/role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../auth.guard';
import { RolesGuard } from '../roles.guard';

export const Auth = (role: Role) => {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
};
