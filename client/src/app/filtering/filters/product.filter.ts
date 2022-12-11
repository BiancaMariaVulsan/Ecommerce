import { Product } from "src/app/models/product.model";
import { ISpecification } from "../specifications/specification.interface";
import { IFilter } from "./Filter.interface";

export class ProductFilter implements IFilter<Product> {
    filter(items: Product[], specification: ISpecification<Product>): Product[] {
        return items.filter(i => specification.isSatisfied(i));
    }
}