import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../interfaces/users.interface';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto/users.dto';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') readonly usersModel: Model<Users>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDTO: CreateUserDTO): Promise<Users> {
    const user = new this.usersModel(createUserDTO);
    return await user.save();
  }

  async findOneByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async findOneById(id: string) {
    return await this.usersModel.findOne({ _id: id });
  }

  async findAll() {
    return await this.usersModel.find();
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<Users> {
    console.log('ID EN SERVICE', id);
    const user = await this.usersModel.findOneAndUpdate(
      { _id: id },
      updateUserDTO,
      { new: true },
    );

    if (updateUserDTO.password) {
      const saltOrRounds = await bcrypt.genSalt();

      const hashedPassword = await bcrypt.hash(
        updateUserDTO.password,
        saltOrRounds,
      );
      console.log('HASHEDPASS', hashedPassword);
      user.password = hashedPassword;
    }
    console.log('USER', user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
