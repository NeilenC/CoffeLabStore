import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../commons/enums/rol.enums';
import { ROLES_KEY } from 'src/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('ROL', role);

    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.role === Role.ADMIN) {
      return true;
    }

    return role === user.role;
  }
}
