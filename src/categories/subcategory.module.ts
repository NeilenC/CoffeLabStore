import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema } from 'src/schemas/categories.schema';
import { SubCategorySchema } from 'src/schemas/subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subcategory', schema: SubCategorySchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}


