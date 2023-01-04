import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentHandler:any = null;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.invokeStripe();
  }
  
  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MKU1wDo0NxQ0glB5HRAxUsR9MsY24POw3YHwIXnoMyFRyJ3cAV6FaErUeuEiWkGuWgAOoB3ILWXTgHA1CE9LTFr00WOT5U5vJ',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
        paymentStripe(stripeToken);
      }
    });

    const paymentStripe = (stripeTocken: any) => {
      this.checkoutService.makePayment(stripeTocken).subscribe((data:any) => {
        console.log(data)
      })
    }
  
    paymentHandler.open({
      name: 'Card Details',
      description: 'Introduce the information from your card',
      amount: amount * 100
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MKU1wDo0NxQ0glB5HRAxUsR9MsY24POw3YHwIXnoMyFRyJ3cAV6FaErUeuEiWkGuWgAOoB3ILWXTgHA1CE9LTFr00WOT5U5vJ',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

}
