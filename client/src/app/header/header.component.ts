import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { ProductVariantService } from '../services/productvariant.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart: Cart;
  productId;
  emptyCart: boolean = true;

  constructor(private cartService: CartService, private variantService: ProductVariantService) {
      this.cartService.getCurrentCart().subscribe(c => {
        this.cart = c;
        if (this.cart.lineItems.length > 0) {
          this.emptyCart = false;
        } else {
          this.emptyCart = true;
        }
      })
   }

  ngOnInit(): void {
  }

  getProductVariant(id) {
    this.variantService.getVariantById(id).subscribe(v => this.productId = v.parent_id)
  }

  updateCart() {
    this.cartService.getCurrentCart().subscribe(c => {
      this.cart = c;
      if (this.cart.lineItems.length > 0) {
        this.emptyCart = false;
      } else {
        this.emptyCart = true;
      }
    })
  }

}
