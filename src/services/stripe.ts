import StripeAPI from "../lib/stripe-api";

export class StripeCustomerService {

    constructor() {

    }

    private stripeApi : StripeAPI = new StripeAPI();

    public async createCustomer(email: string, name:string) {

        return await this.stripeApi.stripe.customers.create({
            email,
            name,
            description: name.concat(' ',`(${email})`)
        });
    }
}