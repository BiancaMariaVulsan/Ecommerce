import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  products: Product[] = []
  newProducts: Product[]
  bestSellerProducts: Product[]
  
  constructor(private productService: ProductService) {}
  //Slider settings
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;

  ngOnInit(): void {
    this.productService.getProducts().subscribe(p => {
        this.products = p;
        this.newProducts = this.products.sort((a,b) => b.id - a.id);
        this.bestSellerProducts = this.products.sort((a,b) => b.nrOfTimesOrdered - a.nrOfTimesOrdered);
      });
  }
}