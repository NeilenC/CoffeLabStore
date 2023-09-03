import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/create')
  async createUser(@Res() res: any, @Body() createUserDTO: CreateUserDTO) {
    const newUser = await this.userService.register(createUserDTO);
    return res.status(HttpStatus.OK).send(newUser);
  }
}
