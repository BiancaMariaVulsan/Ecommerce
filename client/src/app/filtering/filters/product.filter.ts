import { ProductVariant } from "src/app/models/productvariant.model";
import { ISpecification } from "../specifications/specification.interface";
import { IFilter } from "./Filter.interface";

export class ProductFilter implements IFilter<ProductVariant> {
    filter(items: ProductVariant[], specification: ISpecification<ProductVariant>): ProductVariant[] {
        return items.filter(i => specification.isSatisfied(i));
    }
}