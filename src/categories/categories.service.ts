import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories } from 'src/interfaces/categories.interfaces';
import { CreateCategoriesDTO } from 'src/dto/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories') readonly categoriesModel: Model<Categories>,
  ) {}

  async getCategories(): Promise<Categories[]> {
    const categories = await this.categoriesModel.find();
    return categories;
  }

  async getCategory(id: string): Promise<Categories> {
    const category = await this.categoriesModel.findById(id);
    return category;
  }

  async createCategory(
    createCategoriesDTO: CreateCategoriesDTO,
  ): Promise<Categories> {
    const category = new this.categoriesModel(createCategoriesDTO); // Creamos el objeto que vamos a guardar.
    return await category.save();
  }

  async deleteCategory(categoryID: string): Promise<Categories> {
    const deletedCategory =
      await this.categoriesModel.findByIdAndDelete(categoryID);
    return deletedCategory;
  }

  async updateCategory(
    categoryID: string,
    createCategoriesDTO: CreateCategoriesDTO,
  ): Promise<Categories> {
    const updatedCategory = await this.categoriesModel.findByIdAndUpdate(
      categoryID,
      createCategoriesDTO,
      { new: true },
    );
    return updatedCategory;
  }
}
