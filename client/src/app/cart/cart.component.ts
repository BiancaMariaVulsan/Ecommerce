import { Component, OnInit } from '@angular/core';
import { IBasketItem } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  removeCartItem(item: IBasketItem): void {
    this.cartService.removeItemFromCart(item);
  }

  incrementItemQuantity(item: IBasketItem): void {
    this.cartService.changeItemQuantity(item);
  }

  decrementItemQuantity(item: IBasketItem): void {
    this.cartService.changeItemQuantity(item);
  }
}
