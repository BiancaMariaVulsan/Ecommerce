import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBasketItem } from '../models/cart.model';

@Injectable ()
export class CartService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';

    constructor(private http: HttpClient) {}

    changeItemQuantity(item: IBasketItem) {
      return this.http.put<any>(this.APIUrl + 'checkout/change/', item);
    }

    removeItemFromCart(item: IBasketItem) {
      return this.http.post<any>(this.APIUrl + 'checkout/remove/', item);
    }

    addItemToCart(item: IBasketItem) {
      return this.http.post<any>(this.APIUrl + 'checkout/add/', item);
    }

    getCurrentCart() {
      return this.http.get(this.APIUrl + 'checkout/cart/');
    }
    
    deleteCart(basket: any) {
      throw new Error('Method not implemented.');
    }
}