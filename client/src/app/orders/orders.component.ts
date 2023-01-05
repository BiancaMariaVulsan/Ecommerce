import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../models/order.model';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: OrderResponse = new OrderResponse();

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.checkoutService.getOrders().subscribe(o => {
      this.orders = o;
      console.log(o);
    })
  }
  
  logout() {
    localStorage.clear();
  }

}
