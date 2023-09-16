import { Cart } from './cart';

export class User {
  username!: string;
  password!: string;
  isAdmin!: boolean;
  tempCart?: Cart;
  purchaseHistoryCartArray?: Cart[] = [];
  name?: string;
  gender?: string;
  phoneNo?: number;
  address?: string;
  city?: string;
  pinCode?: number;
}
