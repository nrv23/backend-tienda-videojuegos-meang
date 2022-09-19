import { StripeCustomer } from './../../interface/StripeCustomer';
import { IResolvers } from '@graphql-tools/utils';


const typeStripeCustomerResolvers: IResolvers = {
    StripeCustomer: {
        defaultSource: (parent: StripeCustomer) => parent.default_source? parent.default_source: '' 
    }
}

export default typeStripeCustomerResolvers;