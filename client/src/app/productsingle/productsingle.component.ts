import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from '../models/product.model';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {
  product: Product
  private routeSub: Subscription;
  
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.product = this.productService.findProduct(params['id'])
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
