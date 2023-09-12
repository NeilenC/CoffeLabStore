import { ExecutionContext, createParamDecorator } from '@nestjs/common';

//Decorador para que el request del User pueda ser utilizado en todas las rutas requeridas

export const ActiveUser = createParamDecorator(
  // Crear parametro e inyectar informacion y devolver el user con la info completa
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
