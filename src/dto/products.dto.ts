export class CreateProductDTO {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  stock: number;
  category: Category; 
  subcategory: SubCategory
}

export class Category  {
  id: any
  name:any;
}

export class SubCategory  {
  category: any;
  name:any;
  id:any
}
