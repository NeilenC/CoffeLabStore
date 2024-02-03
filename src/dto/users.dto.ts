// import { Transform } from 'stream';
import { IsString, IsOptional, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDTO {
  name: string;
  lastName: string;

  @IsEmail()
  email: string;

  @IsNumber()
  phoneNumber: number;

  password: string;
}

export class UpdateUserDTO {
  @IsOptional()
  name?: string;
  @IsOptional()
  lastName? : string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsNumber()
  phoneNumber?: number;
  @IsOptional()
  password: string;
}
