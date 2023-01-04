import { ProductVariant } from './../models/productvariant.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from '../models/product.model';
import { CategoryService } from '../services/categories.service';
import { ProductService } from '../services/products.service';
import { ProductVariantService } from '../services/productvariant.service';
import { retryWhen } from 'rxjs';

@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.css']
})
export class AdminproductComponent implements OnInit {
  product: Product;
  productVariant: ProductVariant;
  private routeSub: Subscription;
  sizesAvailable: string[];
  colorsAvailable: string[];
  category: string;
  variants: ProductVariant[];

  selectedIndex: number = 0; //for color
  variabila: number = 0; //for stock
  size: string;
  stock: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService, 
    private productVariantService: ProductVariantService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    
    this.routeSub = this.route.params.subscribe(params => {
      this.productService.getProducts().subscribe(p => {
        this.product = p.filter(x => x.id == params['id']).at(0);
        this.sizesAvailable = this.productVariantService.getSizes(this.product.id);
        this.size = this.sizesAvailable.at(0);
        this.sizesAvailable.push('L Large');
        this.sizesAvailable.push('M Medium');
        this.sizesAvailable.push('S Small');
        this.sizesAvailable.push('XS Extra Small');
        this.sizesAvailable = Array.from(new Set(this.sizesAvailable));
        this.colorsAvailable = this.productVariantService.getColors(this.product.id);
        this.colorsAvailable.push('sky-blue');
        this.colorsAvailable.push('red');
        this.colorsAvailable.push('dark');
        this.colorsAvailable.push('magenta');
        this.colorsAvailable.push('yellow');
        this.colorsAvailable = Array.from(new Set(this.colorsAvailable));
        this.category = this.categoryService.findCategoryById(this.product.category);
      });
      this.productVariantService.getProductVariants().subscribe(v => {
        this.variants = v;
        this.productVariant = v.filter(x => x.parent_id == params['id'] && x.color == this.colorsAvailable[this.selectedIndex] && x.size == this.size).at(0);
        this.stock = this.productVariant.stock;
      });

    });
  }

  changeSelection(event, index) {
    console.log(this.colorsAvailable);
    this.selectedIndex = event.target.checked ? index : undefined;
    console.log(this.colorsAvailable[index]);
    this.routeSub = this.route.params.subscribe(params => {
      this.productVariantService.getProductVariants().subscribe(v => {
        this.productVariant = v.filter(x => x.parent_id == params['id'] && x.color == this.colorsAvailable[this.selectedIndex] && x.size == this.size).at(0);
        if(this.productVariant==undefined) {
          this.stock = 0;
          console.log(this.stock);
        } else {
          this.stock = this.productVariant.stock;
        }
        console.log(this.productVariant);
      });
    });
  }

  changeStock(event) {
    this.variabila++;
    console.log(this.variabila);
  }

  changeIsOnSale(event) {
    console.log(this.product.isOnSale);
    console.log(event.target.value);
    console.log(this.productVariant);
  }

  changeSize(event) {
    this.size = event.target.value;
    this.routeSub = this.route.params.subscribe(params => {
      this.productVariantService.getProductVariants().subscribe(v => {
        this.productVariant = v.filter(x => x.parent_id == params['id'] && x.color == this.colorsAvailable[this.selectedIndex] && x.size == this.size).at(0);
        if(this.productVariant==undefined) {
          this.stock = 0;
          console.log(this.stock);
        } else {
          this.stock = this.productVariant.stock;
        }
        console.log(this.productVariant);
      });
    });
  }

  updateProductFields() {
    this.routeSub = this.route.params.subscribe(params => {
      this.productVariantService.getProductVariants().subscribe(v => {
        this.productVariant = v.filter(x => x.parent_id == params['id'] && x.color == this.colorsAvailable[this.selectedIndex] && x.size == this.size).at(0);
      });
    });
    if(this.productVariant == undefined) {
      const parentId = this.product.id;
      const maxIdProdVar = this.variants.length;
      console.log("undef",parentId, maxIdProdVar);
      const newVariant = new ProductVariant(maxIdProdVar + 1, parentId, this.colorsAvailable[this.selectedIndex], this.size, this.variabila);
      this.stock=this.variabila;
      console.log(newVariant);
      this.productVariantService.addVariant(newVariant);
      console.log(this.productVariant);
    } else {
      this.productVariant.stock += this.variabila;
      this.stock = this.productVariant.stock;
      this.productVariantService.updateVariant(this.productVariant);
    }

    this.productService.updateProduct(this.product);
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  
}
