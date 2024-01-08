import { IsString, IsArray } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  userId: string;

  @IsString()
  productId: string;
}
