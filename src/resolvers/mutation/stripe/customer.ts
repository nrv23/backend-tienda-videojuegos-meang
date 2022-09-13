import { StripeCustomerController } from './../../../controllers/stripe';
import { IResolvers } from '@graphql-tools/utils';
const stripe = new StripeCustomerController();

const customerStripeMutationResolvers: IResolvers = {

    Mutation: {
        createCustomer: async(_:void, args:{email: string, name: string}, context: {}) => {

            try {

                const response = await stripe.createCustomer(args.email,args.name);
                console.log(JSON.stringify(response))
                if(response) { // agregó el cliente en stripe

                } else {

                }

                return {
                    status: false,
                    message: "Agreado",
                    customers: null
                }
                
            } catch (error) {
                console.log({error});
                return {
                    status: false,
                    message: "Hubo un error",
                    customers: null
                }
            }
        }
    }
}

export default customerStripeMutationResolvers;