export class CreateCategoriesDTO {
  readonly name: string;
  readonly description: string;
}

export class SubCategoryDTO {
  name: string;
  category: string;
}
