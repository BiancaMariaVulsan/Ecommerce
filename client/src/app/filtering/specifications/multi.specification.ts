import { ISpecification } from "./specification.interface";

export class MultiSpecification<T> implements ISpecification<T> {
    specifications: ISpecification<T>[];    

    constructor(specifications: ISpecification<T>[]) {
        this.specifications = specifications;
    }

    isSatisfied(t: T): boolean {
        const notSatisfiedSpec = this.specifications.find(s => !s.isSatisfied(t));

        return notSatisfiedSpec === undefined;
    }
}