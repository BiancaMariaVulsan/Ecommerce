export class Product {
    constructor(public id: number, public name: string, 
        public imageFirstURL: string, public imageSecondURL: string,
        public isOnSale: boolean, public price: number) {}
}