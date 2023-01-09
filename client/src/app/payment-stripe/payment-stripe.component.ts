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
  successfullPayment: boolean = true;

  constructor(private checkoutService: CheckoutService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCurrentCart().subscribe(c => {
      this.amount = c.price;
    });
  }

  validateData() {
    var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var carcvv = "^[0-9]{3, 4}$";
    if(this.cardNumber.match(cardno) && this.cvv.match(carcvv))
    {
      return true;
    }
    else
    {
      alert("Not a valid credit card number or cvv!");
      return false;
    }
  }

  payWithStripe() {
    if(this.validateData()) {
      if(this.cardNumber === "4000000000009995") {
        this.successfullPayment = false;
        alert("Insufficient Founds!")
      } else if(this.cardNumber === "4000000000009987") {
        this.successfullPayment = false;
        alert("This card has been lost!")
      } else if(this.cardNumber === "4000000000000002") {
        this.successfullPayment = false;
        alert("Declined Card!")
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
        });
      }
    }
    
  }
}