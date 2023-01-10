import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  successfullPayment: boolean = true;

  constructor(private checkoutService: CheckoutService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCurrentCart().subscribe(c => {
      this.amount = c.price;
    });
  }

  placeOrder() {
    this.checkoutService.createOrder(this.checkoutService.orderRequest).subscribe(data => {
      console.log(data);
      this.cartService.deleteCart().subscribe(c => console.log(c))
    });
  }

  validateData() {
    // var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    // var carcvv = /^[0-9]{3, 4}$/;
    // if(this.cardNumber.match(cardno) && this.cvv.match(carcvv))
    if(this.cardNumber.length == 16 && this.cvv.length == 3)
    {
      return true;
    }
    else
    {
      alert("Not a valid credit card number or cvv!");
      this.router.navigate(['/payment-stripe']);
      return false;
    }
  }

  payWithStripe() {
    if(this.validateData()) {
      if(this.cardNumber === "4000000000009995") {
        this.successfullPayment = false;
        alert("Insufficient Founds!");
        this.router.navigate(['/payment-stripe']);
      } else if(this.cardNumber === "4000000000009987") {
        this.successfullPayment = false;
        alert("This card has been lost!");
        this.router.navigate(['/payment-stripe']);
      } else if(this.cardNumber === "4000000000000002") {
        this.successfullPayment = false;
        alert("Declined Card!");
        this.router.navigate(['/payment-stripe']);
      } else {
        this.successfullPayment = true;
        var year = this.expirationDate.substring(0,4);
        var month = this.expirationDate.substring(5,7);
        var customers: Customer[];
        this.checkoutService.getAllCustomers().subscribe(c => {
          customers = c;
          if (!this.checkoutService.findCustomerByEmail(localStorage.getItem("eshop-email"), customers)) {
            this.checkoutService.createStripeCustomer(localStorage.getItem("eshop-email"), localStorage.getItem("eshop-username"), this.cardNumber, year, month, this.cvv).subscribe(data => {
              console.log(data);
              this.checkoutService.makePayment(localStorage.getItem("eshop-email"), this.amount*100).subscribe(data => console.log(data));
            });
          } else {
            this.checkoutService.makePayment(localStorage.getItem("eshop-email"), this.amount*100).subscribe(data => console.log(data));
          }
          alert("Thanks for your order!");
          this.placeOrder();
        });
      }
    }
    
  }
}