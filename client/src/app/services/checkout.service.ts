import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { OrderRequest, OrderResponse } from '../models/order.model';
import { Customer, PaymentModel } from '../models/payment.model';

@Injectable ()
export class CheckoutService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';
    private customers: Customer[];
    orderRequest: OrderRequest;

    constructor(private http: HttpClient) {this.http.get<Customer[]>(this.APIUrl + 'accounts/customers/').subscribe(c => this.customers = c);}

    getAllCustomers() {
      return this.http.get<Customer[]>(this.APIUrl + 'accounts/customers/');
    }

    findCustomerByEmail(email: string, customers: Customer[]) {
      debugger;
      if (customers == null) {
        return false;
      } else if (customers.find(c => c.email === email) !== undefined) {
        return true;
      }
      return false
    }

    createStripeCustomer(email: string, name: string, cardNumber: string, expirationYear: string, expirationMonth: string, cvc: string) {
      return this.http.post<any>(this.APIUrl + 'checkout/customer/', {email: email, name:name, card_number: cardNumber, expirationYear: expirationYear, expirationMonth: expirationMonth, cvc: cvc});
    }

    makePayment(email: string, amount: number) {
      var payment = new PaymentModel(email, amount.toString());
      return this.http.post<any>(this.APIUrl + 'checkout/payment/', payment);
    }

    createOrder(orderToCreate: OrderRequest): Observable<any> {
      return this.http.post<any>(this.APIUrl + 'checkout/order/', orderToCreate);
    }

    getOrders(): Observable<OrderResponse> {
      return this.http.get<OrderResponse>(this.APIUrl + 'checkout/allorders/');
    }

    getOrdersByCustomer(id: string): Observable<OrderResponse> {
      return this.http.get<OrderResponse>(this.APIUrl + 'checkout/allorders/' + id + '/');
    }

    getAddress(): Observable<Address[]> {
      return this.http.get<Address[]>(this.APIUrl + 'checkout/address/');
    }
}