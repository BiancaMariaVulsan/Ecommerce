import { Address } from "./address.model";
import { CartItem } from "./cart.model";

export class OrderRequest {
    userId: string;
    address: Address;
    products: CartItem[];
    total: number;
    status: string;
  }

  export class OrderResponse {
    userId: string;
    address: Address;
    products: CartItem[];
    total: number;
    status: string;
    orderDate: string;
  }