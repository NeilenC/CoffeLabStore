import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { SubCategorySchema } from "src/schemas/subcategory.schema";
import { SubCategoryController } from "./subcategory.controller";
import { SubCategoryService } from "./subcategory.service";
import { CategoriesSchema } from "src/schemas/categories.schema";
import { CategoriesController } from "src/categories/categories.controller";
import { CategoriesService } from "src/categories/categories.service";

@Module({
    imports: [
      ProductsModule,
      MongooseModule.forFeature([{ name: 'SubCategory', schema: SubCategorySchema  }]),
      MongooseModule.forFeature([{ name: 'Categories', schema: CategoriesSchema  }]),
    ],
    controllers: [SubCategoryController, CategoriesController],
    providers: [SubCategoryService, CategoriesService],
  })
  export class ProductsModule {}