import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable ()
export class ProductService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';

    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http.get<Product[]>(this.APIUrl + 'store/products');
    }
    
}