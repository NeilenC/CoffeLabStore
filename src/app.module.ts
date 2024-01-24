import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { ProductsController } from './products/products.controller';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './products/products.service';
import { ProductSchema } from './schemas/products.schema';
import { UserSchema } from './schemas/users.schema';
import { CategoriesSchema } from './schemas/categories.schema';
import { OrderSchema } from './schemas/order.schema';
import { CartSchema } from './schemas/cart.schema';
import { SubCategorySchema } from './schemas/subcategory.schema';
import { SubCategoryController } from 'subcategory/subcategory.controller';
import { SubCategoryService } from 'subcategory/subcategory.service';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    CategoriesModule,
    CartModule,
    UsersModule,
    AuthModule,
    OrderModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'Categories', schema: CategoriesSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    MongooseModule.forFeature([
      { name: 'SubCategory', schema: SubCategorySchema },
    ]),
    MulterModule.register({
      dest: './uploads', 
    }),
    FavoritesModule,
    // AuthModule,
  ],
  controllers: [
    AppController,
    CategoriesController,
    ProductsController,
    UsersController,
    OrderController,
    CartController,
    SubCategoryController,
  ],
  providers: [
    AppService,
    ProductsService,
    CategoriesService,
    UsersService,
    OrderService,
    CartService,
    SubCategoryService,
  ],
})
export class AppModule {}
