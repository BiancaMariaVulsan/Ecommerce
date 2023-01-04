import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBasketItem } from '../models/cart.model';

@Injectable ()
export class CartService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';

    constructor(private http: HttpClient) {}

    incrementItemQuantity(item: IBasketItem) {
        throw new Error('Method not implemented.');
    }

    removeItemFromCart(item: IBasketItem) {
        throw new Error('Method not implemented.');
    }

    addItemToCart(item: IBasketItem) {
        throw new Error('Method not implemented.');
    }

    getCurrentCartValue() {
      throw new Error('Method not implemented.');
    }
    
    deleteCart(basket: any) {
      throw new Error('Method not implemented.');
    }
}