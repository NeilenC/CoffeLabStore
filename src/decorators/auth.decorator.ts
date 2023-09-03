import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/enums/rol.enums';
import { Roles } from './role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
