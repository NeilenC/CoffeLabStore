import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, SubCategory } from 'src/dto/products.dto';
import { throwError } from 'rxjs';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel('SubCategory') readonly subCategoryModel: Model<SubCategory>,
    @InjectModel('Categories') readonly categoryModel: Model<Category>,
  ) {}

  async createSubCategory(createSubCategoryDTO: SubCategory) {
    try {
      const categoryId = createSubCategoryDTO.category;
      const category = await this.categoryModel.findById(categoryId);

      if (!category) {
        throw new Error('Category not found');
      }

      const newSubCategory = new this.subCategoryModel(createSubCategoryDTO);

      newSubCategory.category = createSubCategoryDTO.category;

      await newSubCategory.save();

      return newSubCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByCategory(categoryId: SubCategory) {
    try {
      const getSubCategory = await this.subCategoryModel.find({
        category: categoryId,
      });

      if (getSubCategory.length === 0) {
        console.log(
          'No se encontraron subcategorías para el categoryId:',
          categoryId,
        );
      } else {
        // console.log("GET SUBCATEGORY BY CATEGORY", getSubCategory);
      }
      return getSubCategory;
    } catch (e) {
      console.log('ERROR SERVICE', e);
      throw new Error(e.message);
    }
  }

  async getCategories() {
    const getSubCategory = await this.subCategoryModel.find();
    if (getSubCategory) {
      return getSubCategory;
    }
  }
}
