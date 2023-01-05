import { Component, OnInit } from '@angular/core';
import { Address } from '../models/address.model';
import { Cart, CartStore } from '../models/cart.model';
import { LoginUserReply } from '../models/loginuser.model';
import { OrderRequest } from '../models/order.model';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart;
  policy: boolean;
  paymentMethod: boolean = false // false = online, true = at delivery
  countriesAvailable: string[];
  orderRequest: OrderRequest = new OrderRequest();
  address: Address = new Address();
  loggedUser: LoginUserReply = new LoginUserReply();

  constructor(private cartService: CartService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.cartService.getCurrentCart().subscribe(c => {
      console.log(c);
      CartStore.cart = c;
      this.cart = CartStore.cart;
      this.orderRequest.products = CartStore.cart.lineItems;
      this.orderRequest.total = CartStore.cart.price;
    });
    this.countriesAvailable = ["Romania", "England", "Hungary"]
    this.orderRequest.userId = localStorage.getItem("eshop-userid")
    this.orderRequest.address = this.address;
    this.orderRequest.status = "Processing";

    this.address.country = this.countriesAvailable.at(0);
    this.address.city = "Cluj Napoca";
    this.address.number = "35";
    this.address.street = "Str. George Baritiu";
    this.address.postcode = "308952";

    this.loggedUser.email = localStorage.getItem("eshop-email");
    this.loggedUser.firstName = localStorage.getItem("eshop-firstname");
    this.loggedUser.lastName = localStorage.getItem("eshop-lastname");
  }

  payOnline() {
    this.paymentMethod = false;
  }

  payOnDelivery() {
    this.paymentMethod = true;
  }

  setCountry(event) {
    this.address.country = event.target.value;
    console.log(this.address.country);
  }

  placeOrder() {
    this.checkoutService.createOrder(this.orderRequest).subscribe(data => {
      console.log(data);
      this.cartService.deleteCart().subscribe(c => console.log(c))
    });
  }
}
