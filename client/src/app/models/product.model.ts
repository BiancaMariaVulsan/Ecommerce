export class Product {
    constructor(public id: number, public name: string, 
        public imageFirstURL: string, public imageSecondURL: string,
        public isOnSale: boolean, public price: number, public color: string, 
        public size:string, public likes: number, public nrOfTimesOrdered: number, 
        public description: string) {}
}