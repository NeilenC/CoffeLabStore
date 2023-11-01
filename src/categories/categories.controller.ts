import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDTO } from 'src/dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('/create')
  async createCategory(
    @Res() res: any,
    @Body() createCategoriesDTO: CreateCategoriesDTO,
  ) {
    const newCategory = await this.categoriesService.createCategory(createCategoriesDTO);
    return res.status(HttpStatus.OK).send(newCategory);
  }

  @Get('/')
  async getCategories(@Res() res: any) {
    const category = await this.categoriesService.getCategories();
    return res.status(HttpStatus.OK).send(category);
  }

  @Get('/:categoryID')
  async getCategory(@Res() res: any, @Param('categoryID') categoryID: string) {
    const category = await this.categoriesService.getCategory(categoryID);
    if (!category) {
      return NotFoundException;
    }
    return res.status(HttpStatus.OK).send(category);
  }

  @Delete('/delete')
  async deleteCategory(
    @Res() res: any,
    @Query('categoryID') categoryID: string,
  ) {
    const deletedCategory =
      await this.categoriesService.deleteCategory(categoryID);
    if (!deletedCategory) {
      return NotFoundException;
    }
    return res.status(HttpStatus.OK).json({
      message: 'Categoria eliminada',
      deletedCategory,
    });
  }

  @Put('/update')
  async updateCategory(
    @Res() res: any,
    @Body() createCategoriesDTO: CreateCategoriesDTO,
    @Query('categoryID') categoryID: string,
  ) {
    const updatedCategory = await this.categoriesService.updateCategory(
      categoryID,
      createCategoriesDTO,
    );
    if (!updatedCategory) throw new NotFoundException('Categoria no existe');
    return res.status(HttpStatus.OK).json({
      message: 'Modificado con exito',
      updatedCategory,
    });
  }
}
