export class CreateProductDTO {
  name: string;
  description: string;
  imageURL: string;
  imageFile: string;
  price: number;
  keys: string[];
  stock: number;
  category: Category;
  subcategory: SubCategory;
}

export class Category {
  id: any;
  name: any;
}

export class SubCategory {
  id: any;
  name: any;
  category: any;
}
