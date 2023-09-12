import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterDTO } from 'src/dto/register.dto';
// import { AuthService } from './auth.service';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
// import { Request } from 'express';
import { Role } from '../commons/enums/rol.enums';
import { Auth } from 'src/decorators/auth.decorator';
import { ActiveUser } from 'src/commons/activeUser.decorator';
import { userActiveInterface } from '../commons/userActive.interface';

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
  @Auth(Role.USER)
  profile(@ActiveUser() user: userActiveInterface) {
    return this.authService.profile(user);
  }
}
