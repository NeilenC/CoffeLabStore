import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schemas/products.schema';
import { CategoriesSchema } from 'src/schemas/categories.schema';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesController } from 'src/categories/categories.controller';
import { SubCategorySchema } from 'src/schemas/subcategory.schema';
import { SubCategoryService } from 'subcategory/subcategory.service';
import { SubCategoryController } from 'subcategory/subcategory.controller';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema} ,
      { name: 'Categories', schema: CategoriesSchema },
      { name: 'SubCategory', schema: SubCategorySchema },
    ]),
  ],
  controllers: [
    ProductsController,
    CategoriesController,
    SubCategoryController,
  ],
  providers: [ProductsService, CategoriesService, SubCategoryService],
})
export class ProductsModule {}
