import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  paymentMethod: boolean = false // false = online, true = at delivery

  constructor() { }

  ngOnInit(): void {
  }

  setPayment() {
    this.paymentMethod = !this.paymentMethod
  }

}
