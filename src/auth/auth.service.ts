import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDTO } from 'src/dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register({
    name,
    lastName,
    email,
    phoneNumber,
    password,
  }: RegisterDTO) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException(`El email ${email} ya se encuentra registrado`);
    }
    // const saltOrRounds = await bcrypt.genSalt();
    const newUser = await this.usersService.register({
      name,
      lastName,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, 10),
    });
    return newUser.save();
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email inválido');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña inválida');
    }

    const payload = { email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);
    return { token, user };
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }
}
