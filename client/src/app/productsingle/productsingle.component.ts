import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from '../models/product.model';
import { CategoryService } from '../services/categories.service';
import { ProductService } from '../services/products.service';
import { ProductVariantService } from '../services/productvariant.service';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {
  product: Product;
  private routeSub: Subscription;
  sizesAvailable: string[];
  colorsAvailable: string[];
  category: string;
  mayLikeProducts: Product[];
  
  constructor(private route: ActivatedRoute, private productService: ProductService, 
    private productVariantService: ProductVariantService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.productService.getProducts().subscribe(p => {
        this.mayLikeProducts = p.filter(a => a.isOnSale).sort((a,b) => b.likes - a.likes);
        this.product = p.filter(x => x.id == params['id']).at(0);
        this.sizesAvailable = this.productVariantService.getSizes(this.product.id);
        this.colorsAvailable = this.productVariantService.getColors(this.product.id);
        this.category = this.categoryService.findCategoryById(this.product.category);
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  
}
