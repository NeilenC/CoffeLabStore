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
  productPreferences: ProductPreferences
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

export class ProductPreferences {
  grind: string;
  color: string;
}
