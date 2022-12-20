import { Product } from "src/app/models/product.model";
import { ISpecification } from "./specification.interface";

export class ColorSpecification implements ISpecification<Product> {
    color: string;

    constructor(color: string) {
        this.color = color;
    }

    isSatisfied(t: Product): boolean {
        return t.color.includes(this.color);
    }
}