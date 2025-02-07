import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from 'src/dto/favorites.dto';
import { FavoritesDocument } from 'src/schemas/favorites';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/:userId/add-to-favorites')
  async addToFavorites(@Param('userId') userId: string, @Body() body: { productId: string }): Promise<FavoritesDocument> {
    const favorites = await this.favoritesService.addToFavorites({ userId, productId: body.productId });
    return favorites;
  }

  
  @Get(':userId/get-favorites')
  async getUserFavorites(@Param('userId') userId: string): Promise<FavoritesDocument[]> {
    const favorites = await this.favoritesService.getUserFavorites(userId);
    return favorites;
  }

@Delete('/:userId/remove-from-favorites')
async removeFromFavorites(
  @Param('userId') userId: string,
  @Body('productId') productId: string,
): Promise<FavoritesDocument | null> {

  return this.favoritesService.removeFromFavorites(userId, productId);
}

}