import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterDTO } from 'src/dto/register.dto';
// import { AuthService } from './auth.service';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthGuard } from './auth.guard';

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
  @UseGuards(AuthGuard)
  profile() {
    return 'profile';
  }
}
