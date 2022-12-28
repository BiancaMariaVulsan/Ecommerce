import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable ()
export class ProductService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';
    private products: Product[]

    constructor(private http: HttpClient) {}

    getProducts() {
        this.http.get<Product[]>(this.APIUrl + 'store/products').subscribe(p => this.products = p);
        return this.http.get<Product[]>(this.APIUrl + 'store/products');
    }

    updateLikes(newProduct: Product) {
        return this.http.put(this.APIUrl + 'store/products/' + newProduct.id + '/', newProduct)
        .subscribe();
    }

    findProduct(id: number): Product {
        // Suppose a product with this id exists
        return this.products.filter(p => p.id == id).at(0)
    }
}