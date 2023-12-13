import { Body, Controller, Post, Res, HttpStatus, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/create')
  async createUser(@Res() res: any, @Body() createUserDTO: CreateUserDTO) {
    const newUser = await this.userService.register(createUserDTO);
    return res.status(HttpStatus.OK).send(newUser);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: any
  ) {
    const user = await this.userService.findOneById(id);
    return res.send(user);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Res() res: any,
    @Body() updateUserDTO: UpdateUserDTO
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDTO);
    return res.status(HttpStatus.OK).send(updatedUser);
  }

}
