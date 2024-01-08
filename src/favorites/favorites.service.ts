import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoritesDocument } from 'src/schemas/favorites';

@Injectable()
export class FavoritesService {
    constructor(@InjectModel('Favorites') private readonly favoritesModel: Model<FavoritesDocument>) {}
    private favoriteProducts: Array<FavoritesDocument> = [];

    async addToFavorites(data: { userId: string, productId: string }): Promise<FavoritesDocument | null> {
      const existingFavorite = await this.favoritesModel.findOne({ userId: data.userId });
    
      if (existingFavorite) {
        if (Array.isArray(existingFavorite.productId)) {
          existingFavorite.productId.push(data.productId);
        } 
        await existingFavorite.save();
        return existingFavorite;
      } else {
        // Si no existe, crear un nuevo favorito con el productId
        const createdFavorite = new this.favoritesModel({
          userId: data.userId,
          productId: Array.isArray(data.productId) ? data.productId : [data.productId],
        });
    
        await createdFavorite.save();
        this.favoriteProducts.push(createdFavorite);
        console.log("Created new favorite", createdFavorite);
    
        return createdFavorite;
      }
    }
    
    
      async getUserFavorites(userId: string): Promise<FavoritesDocument[]> {
        return await this.favoritesModel.find({ userId }).exec();
      }

      async removeFromFavorites(userId: string, productId: string): Promise<FavoritesDocument | null> {
        try {
          const existingFavorite = await this.favoritesModel.findOne({ userId });

          if (!existingFavorite) {
            console.log('Error: Favorito no encontrado');
            return null;
          }

         if (Array.isArray(existingFavorite.productId)) {
          const filteredProductIndex = existingFavorite.productId.findIndex((id: string) => id === productId);

      if (filteredProductIndex !== -1) {
        const splice = existingFavorite.productId.splice(filteredProductIndex, 1);
        await existingFavorite.save();
          } else {
            console.log('Error: productId no es un arreglo');
            return null;
          }
        }} catch (error) {
          console.error('Error:', error);
          throw error;
        }
      }
      
      
      
      
      
}
