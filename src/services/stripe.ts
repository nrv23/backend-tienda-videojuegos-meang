import { ListCustomerStripeResponse } from "../interface/IListCustomersStripeResponse";
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

    public async getCustomers(limit: number,startingAfter: string,endingBefore: string): Promise<ListCustomerStripeResponse> {

        let filter :any = {}
        filter.limit = limit;

        if(startingAfter) {
            filter.starting_after = startingAfter;
        }


        if(endingBefore) {
            filter.ending_before = endingBefore;
        }
        console.log({filter});
        
        return await this.stripeApi.stripe.customers.list(filter); 
    }
}