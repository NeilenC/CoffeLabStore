import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../interfaces/users.interface';
import { CreateUserDTO } from 'src/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') readonly usersModel: Model<Users>) {}

  async register(createUserDTO: CreateUserDTO): Promise<Users> {
    const user = new this.usersModel(createUserDTO);
    return await user.save();
  }

  async findOneByEmail(email: string) {
    return await this.usersModel.findOne({ email });
  }

  async findAll() {
    return await this.usersModel.find();
  }
}
