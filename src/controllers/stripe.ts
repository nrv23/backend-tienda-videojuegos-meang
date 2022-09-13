import { StripeCustomerService } from './../services/stripe';

export class StripeCustomerController {

    constructor() {

    }

    private stripeCustomerService: StripeCustomerService = new StripeCustomerService();

    public async createCustomer(email: string, name: string) {
        return this.stripeCustomerService.createCustomer(email,name);
    }
}