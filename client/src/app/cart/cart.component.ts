import { Component, OnInit } from '@angular/core';
import { Cart, CartItem, CartStore } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/products.service';
import { ProductVariantService } from '../services/productvariant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];
  totalPrice: number;
  emptyCart: boolean = true;
  productId;

  constructor(private cartService: CartService, private variantService: ProductVariantService) { }

  ngOnInit(): void {
    this.cartService.getCurrentCart().subscribe(c => {
      console.log(c);
      CartStore.cart = c;
      this.cartItems = CartStore.cart.lineItems;
      if(this.cartItems.length > 0) {
        this.emptyCart = false;
      } else {
        this.emptyCart = true;
      }
      this.totalPrice = CartStore.cart.price;
    });
  }

  removeCartItem(itemId: string): void {
    this.cartService.removeItemFromCart(itemId).subscribe(c => {
      console.log(c);
      CartStore.cart = c;
      this.cartItems = CartStore.cart.lineItems;
      if(this.cartItems.length > 0) {
        this.emptyCart = false;
      } else {
        this.emptyCart = true;
      }
      this.totalPrice = CartStore.cart.price;
    });
  }

  changeQuantity(event, item: CartItem): void {
    item.quantity = event.target.value;
    this.cartService.changeItemQuantity(item).subscribe(c => {
      console.log(c);
      CartStore.cart = c;
      this.cartItems = CartStore.cart.lineItems;
      if(this.cartItems.length > 0) {
        this.emptyCart = false;
      } else {
        this.emptyCart = true;
      }
      this.totalPrice = CartStore.cart.price;
    });
  }

  getProductVariant(id) {
    this.variantService.getVariantById(id).subscribe(v => this.productId = v.parent_id)
  }
}
