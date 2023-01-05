import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/payment.model';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-payment-stripe',
  templateUrl: './payment-stripe.component.html',
  styleUrls: ['./payment-stripe.component.css']
})
export class PaymentStripeComponent implements OnInit {
  cardNumber: string;
  cvv: string;
  expirationDate;
  amount: number;

  constructor(private checkoutService: CheckoutService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCurrentCart().subscribe(c => {
      this.amount = c.price;
    });
  }

  validateData() {
    //TODO
  }

  payWithStripe() {
    var year = this.expirationDate.substring(0,4);
    var month = this.expirationDate.substring(5,7);
    var customers: Customer[];
    this.checkoutService.getAllCustomers().subscribe(c => {
      customers = c;
      if (!this.checkoutService.findCustomerByEmail(localStorage.getItem("eshop-email"), customers)) {
        this.checkoutService.createStripeCustomer(localStorage.getItem("eshop-email"), localStorage.getItem("eshop-username"), this.cardNumber, year, month, this.cvv).subscribe(data => {
          console.log(data);
          this.checkoutService.makePayment(localStorage.getItem("eshop-email"), this.amount).subscribe(data => console.log(data));
        });
      } else {
        this.checkoutService.makePayment(localStorage.getItem("eshop-email"), this.amount).subscribe(data => console.log(data));
      }
    });
  }
}
