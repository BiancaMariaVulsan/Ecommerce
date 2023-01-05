export class Cart {
    userid: string;
    lineItems: CartItem[];
    price: number;
  }

export class CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }

export class CartStore {
  static cart: Cart
}