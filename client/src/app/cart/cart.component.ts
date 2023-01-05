import { Component, OnInit } from '@angular/core';
import { Cart, CartItem, CartStore } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];
  totaPrice: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCurrentCart().subscribe(c => {
      console.log(c);
      CartStore.cart = c;
      this.cartItems = CartStore.cart.lineItems;
      this.totaPrice = CartStore.cart.price;
    });
  }

  removeCartItem(itemId: string): void {
    this.cartService.removeItemFromCart(itemId).subscribe(c => {
      console.log(c);
      CartStore.cart = c;
      this.cartItems = CartStore.cart.lineItems;
    });
  }

  changeQuantity(event, item: CartItem): void {
    item.quantity = event.target.value;
    this.cartService.changeItemQuantity(item).subscribe(c => {
      console.log(c);
      CartStore.cart = c;
      this.cartItems = CartStore.cart.lineItems;
    });
  }
}
