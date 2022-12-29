import { Component, OnInit } from '@angular/core';
import { ProductFilter } from '../filtering/filters/product.filter';
import { ColorSpecification } from '../filtering/specifications/color.specification';
import { MultiSpecification } from '../filtering/specifications/multi.specification';
import { SizeSpecification } from '../filtering/specifications/size.specification';
import { Product } from '../models/product.model';
import { ProductVariant } from '../models/productvariant.model';
import { ProductService } from '../services/products.service';
import { ProductVariantService } from '../services/productvariant.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[];
  variants: ProductVariant[];
  filteredProducts: Product[];
  filteredByPopularity: Product[];

  private color = '';
  private size = '';

  constructor(private productService: ProductService, private productVariantService: ProductVariantService) { }

  ngOnInit(): void {
    this.productVariantService.getProductVariants().subscribe(v => this.variants = v);
    this.productService.getProducts().subscribe(p => {
      this.products = p;
      this.filteredProducts = this.products;
      this.filteredByPopularity = this.products.sort((a, b) => b.likes - a.likes);
    });
  }

  onColorSelected(color: string, event) {
    if (event.target.checked) {
      this.color = color;
      this.filter();
    } else {
      this.color = '';
      this.filter();
    }
  }

  onSizeSelected(size: string, event) {
    if (event.target.checked) {
      this.size = size;
      this.filter();
    } else {
      this.size = '';
      this.filter();
    }
  }

  filter() {
    const colorSpec = new ColorSpecification(this.color);
    const sizeSpec = new SizeSpecification(this.size);
    const multiSpec = new MultiSpecification([colorSpec, sizeSpec]);
    const productFilter = new ProductFilter();
    this.filteredProducts = Array.from(new Set(
      productFilter
        .filter(this.variants, multiSpec)
        .map(v => this.productService.findProduct(v.parent_id))
      ));
  }

  updateProductLikes(product: Product) {
    product.likes++;
    this.productService.updateLikes(product);
  }
}
