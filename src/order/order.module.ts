import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema } from 'src/schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from 'src/schemas/cart.schema';
import { ProductSchema } from 'src/schemas/products.schema';

@Module({
  imports: [
    OrderModule,
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Cart', schema: CartSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}