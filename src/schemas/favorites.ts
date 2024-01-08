import { Document, Schema } from 'mongoose';

interface Favorites {
  userId: string;
  productId: string;
}

export interface FavoritesDocument extends Favorites, Document {}

export const FavoritesSchema = new Schema<FavoritesDocument>({
  userId: { type: String, ref: 'Users' },
  productId: [{ type: String, ref: 'Product' }],
});