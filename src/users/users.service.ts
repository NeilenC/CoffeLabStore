import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../interfaces/users.interface';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto/users.dto';

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

  async findOneById(id: string) {
    return await this.usersModel.findOne({ _id: id });
  }

  async findAll() {
    return await this.usersModel.find();
  }

  async updateUser(userId: string, updateUserDTO: UpdateUserDTO): Promise<Users> {
    const user = await this.usersModel.findOne({userId});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Actualizar propiedades según las recibidas en el DTO
    Object.assign(user, updateUserDTO);
    console.log(user, updateUserDTO);

    // Guardar los cambios en la base de datos
    return await user.save();
  }
}
