import { Product } from "src/app/models/product.model";
import { ProductVariant } from "src/app/models/productvariant.model";
import { ISpecification } from "./specification.interface";

export class SizeSpecification implements ISpecification<ProductVariant> {
    size: string;

    constructor(size: string) {
        this.size = size;
    }

    isSatisfied(t: ProductVariant): boolean {
        return t.size.includes(this.size);
    }
}