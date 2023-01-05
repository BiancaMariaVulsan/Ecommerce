import { Component, OnInit } from '@angular/core';
import { Address } from '../models/address.model';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address: Address;
  userFirtName: string;
  userLastName: string;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.checkoutService.getAddress().subscribe(a => {
      this.address = a.filter(a => a.userId === localStorage.getItem("eshop-userid")).at(0);
      this.userFirtName = localStorage.getItem("eshop-firstname");
      this.userLastName = localStorage.getItem("eshop-lastname");
      console.log(this.address);
    })
  }

  logout() {
    localStorage.clear();
  }

}
