import { StripeCustomerController } from './../../../controllers/stripe';
import { IResolvers } from '@graphql-tools/utils';
const stripe = new StripeCustomerController();

const customerStripeMutationResolvers: IResolvers = {

    Mutation: {
        createCustomer: async(_:void, args:{email: string, name: string}, context: {}) => {

            try {

                const customerResponse = await stripe.createCustomer(args.email,args.name);

                if(!customerResponse) { // agregó el cliente en stripe
                    return {
                        status: false,
                        message: "No se pudo agregar el cliente",
                        customers: null
                    }
                }
                
                return {
                    status: true,
                    message: "No se pudo agregar el cliente",
                    customers: customerResponse 
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