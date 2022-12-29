import { Product } from "src/app/models/product.model";
import { ProductVariant } from "src/app/models/productvariant.model";
import { ISpecification } from "./specification.interface";

export class ColorSpecification implements ISpecification<ProductVariant> {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

    isSatisfied(t: ProductVariant): boolean {
        return t.color.includes(this.color);
    }
}