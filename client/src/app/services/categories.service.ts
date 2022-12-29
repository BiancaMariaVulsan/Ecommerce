import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/categorie.model';

@Injectable ()
export class CategoryService {
    private readonly APIUrl = 'http://127.0.0.1:8000/';
    private categories: Category[]

    constructor(private http: HttpClient) {this.http.get<Category[]>(this.APIUrl + 'category/categories').subscribe(c => this.categories = c);}

    getCategories() {
        return this.http.get<Category[]>(this.APIUrl + 'category/categories');
    }

    findCategoryById(categoryId: number): string {
        // suppose a category with the given id exists
        return this.categories.filter(c => c.id == categoryId).map(c => c.category_name).at(0);
    }
}