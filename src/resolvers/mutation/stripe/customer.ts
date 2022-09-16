import { StripeCustomerController } from './../../../controllers/stripe';
import { IResolvers } from '@graphql-tools/utils';
const stripe = new StripeCustomerController();

const customerStripeMutationResolvers: IResolvers = {

    Mutation: {
        createCustomer: async(_:void, args:{email: string, name: string}, context: {}) => {

            try {

                const customerResponse = await stripe.createCustomer(args.email,args.name);

                if(customerResponse.exists && !customerResponse.data) {
                    return {
                        status: false,
                        message: "El cliente fue registrado anteriormente",
                        customers: customerResponse.data
                    }
                }

                if(!customerResponse.exists && !customerResponse.data) { // agregó el cliente en stripe
                    return {
                        status: false,
                        message: "No se pudo agregar el cliente",
                        customers: customerResponse.data
                    }
                }
                
                return {
                    status: true,
                    message: "Se ha agregado el cliente",
                    customers: customerResponse.data 
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