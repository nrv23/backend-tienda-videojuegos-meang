import { IResolvers } from '@graphql-tools/utils';
import { StripeCustomerController } from './../../../controllers/stripe';

const stripe = new StripeCustomerController();

const queryStripeCustomersResolvers: IResolvers = {

    Query: {

        customers: async(_:void, args: { limit: number,startingAfter: string,endingBefore: string  }, context:{ }) => {

            try {

                const { data,has_more } = await stripe.getCustomers(args.limit, args.startingAfter,args.endingBefore)

                return {
                    status: true,
                    message: "",
                    customers: data,
                    hasMore: has_more
                }
                
            } catch (error) {
                return {
                    status: false,
                    message: "No se pudieron obtener los clientes",
                    customers: null,
                    hasMore: false
                }
            }
        }

    }
}

export default queryStripeCustomersResolvers;