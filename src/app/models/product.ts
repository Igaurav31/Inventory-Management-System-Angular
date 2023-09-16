import { ProductCategory } from './product-category';

export class Product {
  id?: number;
  name!: string;
  imageURL!: string;
  sellingPrice!: number;
  costPrice!: number;
  description!: string;
  stock!: number;
  category!: ProductCategory['name'];
  tags!: string;
}
