// import { Transform } from 'stream';

export class CreateUserDTO {
  // @Transform(({ value }) => value.trim())
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly address: string;
  readonly phoneNumber: string;
}
