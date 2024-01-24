import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from 'src/schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from 'src/schemas/cart.schema';
import { ProductSchema } from 'src/schemas/products.schema';
import { CartController } from 'src/cart/cart.controller';
import { CartService } from 'src/cart/cart.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [
    OrderModule,
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Cart', schema: CartSchema },
      { name: 'Product', schema: ProductSchema },
    ]),

  ],
  controllers: [OrderController, CartController],
  providers: [OrderService, CartService, ProductsService],
})
export class OrderModule {}
