import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { CategoriesController } from './categories/categories.controller';
// import { CategoriesService } from './categories/categories.service';
// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/users.service';
// import { OrderController } from './order/order.controller';
// import { OrderService } from './order/order.service';
// import { CartController } from './cart/cart.controller';
// import { CartService } from './cart/cart.service';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
// import { ProductsController } from './products/products.controller';
// import { CategoriesController } from "./categories/categories.controller"
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

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
    // AuthModule,
  ],
  controllers: [
    AppController,
    // CategoriesController,
    // ProductsController,
    // UsersController,
    // OrderController,
    // CartController,
  ],
  providers: [
    AppService,
    // CategoriesService,
    // UsersService,
    // OrderService,
    // CartService,
  ],
})
export class AppModule {}
