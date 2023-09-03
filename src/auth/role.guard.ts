import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/rol.enums';
// import { Role } from '../../common/enums/rol.enum';
// import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('ROL', role);

    if (!role) {
      return true;
    }

    // const { user } = context.switchToHttp().getRequest();

    // if(user.role === Role.ADMIN) {
    //   return true;
    // }

    // return role === user.role;
  }
}
