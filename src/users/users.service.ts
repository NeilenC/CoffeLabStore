import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    function capitalizeFirstLetter(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const capitalizedFirstName = capitalizeFirstLetter(createUserDTO.name);
    const capitalizedLastName = capitalizeFirstLetter(createUserDTO.lastName);
    const modifiedUserDTO: CreateUserDTO = {
      ...createUserDTO,
      name: capitalizedFirstName,
      lastName: capitalizedLastName,
    };
    const user = new this.usersModel(modifiedUserDTO);
  
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

    const updatedUser = await this.usersModel.findOneAndUpdate(
      { _id: id },
      updateUserDTO,
      { new: true }
    );
  
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
  
  async modifyPassword(id: string, updateUserDTO: UpdateUserDTO, currentPassword: string) {

    const getUser = await this.usersModel.findOne({ _id: id });
    if (!getUser) {
      throw new NotFoundException('User not found');
    }
  
    if (updateUserDTO.password && currentPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, getUser.password);
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }
  
      if (updateUserDTO.password) {
        const hashedPassword = await bcrypt.hash(updateUserDTO.password, 10);
        getUser.password = hashedPassword;
  
        const updatedUser = await this.usersModel.findOneAndUpdate(
          { _id: id },
          getUser,
          { new: true }
        );
  
        if (!updatedUser) {
          throw new NotFoundException('User not found');
        }
  
        return updatedUser;
      }
    }
  }
  
  
}
