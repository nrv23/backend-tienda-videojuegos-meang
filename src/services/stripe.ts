import { STRIPE_OBJECTS, STRIPE_ACTIONS } from './../config/constant';
import { ListCustomerStripeResponse } from "../interface/IListCustomersStripeResponse";
import StripeAPI from "../lib/stripe-api";

export class StripeCustomerService {

    constructor() {

    }

    private stripeApi : StripeAPI = new StripeAPI();

    public async createCustomer(email: string, name:string) {
        return await this.stripeApi.execute(STRIPE_OBJECTS.CUSTOMERS,STRIPE_ACTIONS.CREATE,{
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
        
        return await this.stripeApi.execute(STRIPE_OBJECTS.CUSTOMERS,STRIPE_ACTIONS.LIST,filter);
    }



    public async getCustomerByEmail(email: string): Promise<ListCustomerStripeResponse> {

        //const query =  `email:\'${email.trim()}\'`;
        //console.log({query});
        return await this.stripeApi.execute(STRIPE_OBJECTS.CUSTOMERS,STRIPE_ACTIONS.LIST,{email});
    }
}