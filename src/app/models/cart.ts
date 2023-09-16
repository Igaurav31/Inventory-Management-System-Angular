import { productAndQuantity } from './product-and-quantity';

export class Cart {
  productAndQuantity: productAndQuantity[] = [];
  totalBill: number = 0;
  date?: Date = new Date();
}
