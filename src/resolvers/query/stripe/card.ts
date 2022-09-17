import { ICardRequest } from './../../../interface/ICardRequest';
import { CardController } from './../../../controllers/card';
import { IResolvers } from '@graphql-tools/utils';

const card = new CardController();


const cardStripeQueryResolvers: IResolvers = {

    Query: {
        createCardToken: async (_:void, args: ICardRequest, context: {} ) => {

            try {
                
                const response = await card.createCardToken(args);

                return {
                    status: true,
                    message: "",
                    token: response.id
                }

            } catch (error) {
                console.log({error});
                return {
                    status: false,
                    message: "Hubo un error"
                }
            }
        }
    }
}

export default cardStripeQueryResolvers;