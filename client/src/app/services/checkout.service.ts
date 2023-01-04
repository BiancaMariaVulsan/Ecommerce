import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { IOrderToCreate } from '../models/order.model';

@Injectable ()
export class CheckoutService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';

    constructor(private http: HttpClient) {}

    makePayment(stripeTocken: any):Observable<any> {
        return this.http.post<any>(this.APIUrl + 'checkout/payment/', stripeTocken);
    }

    createOrder(orderToCreate: IOrderToCreate): any {
      // make a post call to orders table
      throw new Error('Method not implemented.');
    }
}