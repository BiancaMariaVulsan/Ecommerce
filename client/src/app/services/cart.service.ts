import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable ()
export class CartService {
    private readonly APIUrl = 'http://127.0.0.1:5300/';

    constructor(private http: HttpClient) {}

    changeItemQuantity(item: CartItem) {
      return this.http.put<Cart>(this.APIUrl + 'api/Cart/' + localStorage.getItem("eshop-userid") + '/change', item);
    }

    removeItemFromCart(itemId: string) {
      return this.http.post<Cart>(this.APIUrl + 'api/Cart/' + localStorage.getItem("eshop-userid") + '/removeItem/' + itemId, itemId);
    }

    addItemToCart(id: number, name: string, quantity: number, price: number) {
      debugger;
      return this.http.post<Cart>(this.APIUrl + 'api/Cart/' + localStorage.getItem("eshop-userid") + '/addItem', {id: id.toString(), name: name, quantity: quantity, price: price});
    }

    getCurrentCart(): Observable<Cart> {
      return this.http.get<Cart>(this.APIUrl + 'api/Cart/' + localStorage.getItem("eshop-userid"));
    }
    
    deleteCart(cart: any) {
      throw new Error('Method not implemented.');
    }
}