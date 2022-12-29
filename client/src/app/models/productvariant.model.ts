export class ProductVariant {
    constructor(public id: number, public parent_id: number, public color: string, 
        public size: string, public stock: number) {}
}