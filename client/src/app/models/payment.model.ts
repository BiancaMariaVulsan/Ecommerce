export class PaymentModel {
    constructor(public email: string, public amount: string) {}
}

export class Customer {
    constructor(public email: string, public customerId: string) {}
}