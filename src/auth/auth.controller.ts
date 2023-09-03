import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { RegisterDTO } from 'src/dto/register.dto';
// import { AuthService } from './auth.service';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { Request } from 'express';
import { Role } from './enums/rol.enums';
import { Auth } from 'src/decorators/auth.decorator';

interface RequestWithUser extends Request {
  user: {
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
    registerDto: RegisterDTO,
  ) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  login(
    @Body()
    loginDto: LoginDTO,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.ADMIN)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
