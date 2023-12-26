import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { SubCategoryService } from './subcategory.service';
import { SubCategory } from 'src/dto/products.dto';

@Controller('subcategory')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('/create')
  async createSubCategory(@Body() createSubCategoryDTO: SubCategory) {
    try {
      const newSubCategory =
        await this.subCategoryService.createSubCategory(createSubCategoryDTO);
      return newSubCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('/:categoryId')
  async getSubCategory(@Param('categoryId') categoryId: any) {
    try {
      const id = categoryId;

      const getByCategory = await this.subCategoryService.getByCategory(id);
      return getByCategory;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  @Get()
  async getSubCategories() {
    const subCategories = await this.subCategoryService.getCategories();
    return subCategories;
  }
}
