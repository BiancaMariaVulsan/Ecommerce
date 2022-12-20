import { Product } from "src/app/models/product.model";
import { ISpecification } from "./specification.interface";

export class SizeSpecification implements ISpecification<Product> {
    size: string;

    constructor(size: string) {
        this.size = size;
    }

    isSatisfied(t: Product): boolean {
        return t.size.includes(this.size);
    }
}