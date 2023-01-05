import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductVariant } from '../models/productvariant.model';

@Injectable ()
export class ProductVariantService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';
    private variants: ProductVariant[]

    constructor(private http: HttpClient) {this.http.get<ProductVariant[]>(this.APIUrl + 'store/variants').subscribe(v => this.variants = v);}

    getProductVariants() {
        this.http.get<ProductVariant[]>(this.APIUrl + 'store/variants').subscribe(v => this.variants = v);
        return this.http.get<ProductVariant[]>(this.APIUrl + 'store/variants');
    }

    getSizes(productId: number): string[] {
        return Array.from(new Set(this.variants.filter(v => v.parent_id == productId).map(v => v.size)));
    }

    getColors(productId: number): string[] {
        return Array.from(new Set(this.variants.filter(v => v.parent_id == productId).map(v => v.color)));
    }

    updateVariant(newVariant: ProductVariant) {
        return this.http.put(this.APIUrl + 'store/variants/' + newVariant.id + '/', newVariant)
        .subscribe();
    }

    addVariant(newVariant: ProductVariant) {
        return this.http.post(this.APIUrl + 'store/variants/', newVariant)
        .subscribe();
    }

    filterByColorAndSize(productId: number, color: string, size: string) {
        debugger;
        return this.variants.filter(v => v.parent_id == productId && v.size == size && v.color == color).map(v => v.id).at(0);
    }
}