// import { Transform } from 'stream';
import { IsString, IsOptional, IsEmail, IsNumber } from 'class-validator';


export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phoneNumber: number;

  password: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  lastName?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsNumber()
  phoneNumber?: number;
}
