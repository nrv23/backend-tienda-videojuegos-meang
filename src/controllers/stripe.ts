import { StripeCustomer } from './../interface/StripeCustomer';
import { StripeCustomerService } from './../services/stripe';

export class StripeCustomerController {

    constructor() {

    }

    private stripeCustomerService: StripeCustomerService = new StripeCustomerService();

    public async createCustomer(email: string, name: string) {
        const response = await  this.stripeCustomerService.createCustomer(email,name);
        if(response) {
            return [response] as [StripeCustomer];
        } else {
            return null;
        }
    }

    public async getCustomers(limit: number,startingAfter: string = '',endingBefore: string = '') {

        return await this.stripeCustomerService.getCustomers(limit,startingAfter,endingBefore);
    }
}