import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesSchema } from 'src/schemas/favorites';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Favorites', schema: FavoritesSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule {}
