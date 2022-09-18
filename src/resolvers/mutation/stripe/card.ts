import { Card } from './../../../interface/ICreditCard';
import { CardController } from './../../../controllers/card';

import { IResolvers } from '@graphql-tools/utils';
const card = new CardController();

const mutationCardStripeResolvers: IResolvers = {
    Mutation: {
        createCard: async (_:void, args: {customerId:string,tokenCard:string }) => {
            try {

                const response = await card.addTokenCard(args.customerId, args.tokenCard);
                console.log(response);
                if(!response.id){
                    return {
                        status: false,
                        message: "No se pudo configurar el cliente con la información de la tarjeta",
                        card: null
                    }
                }else {
                    return {
                        status: true,
                        message: "Se ha asociado correctamente al cliente con la tarjeta",
                        dataCard: [response]
                    }
                }
                

            } catch (error) {
                console.log({error});
                return {
                    status: false,
                    message: "Hubo un error"
                }
            }
        },
        updateCard: async(_:void, args:{customerId: string, tokenCard: string, details: Card}, context: {}) => {
            try {

                const response = await card.updateCard(args.customerId, args.tokenCard, args.details);
                
                if(!response.id){
                    return {
                        status: false,
                        message: "No se pudo actualizar  la información de la tarjeta",
                        dataCard: null
                    }
                }else {
                    return {
                        status: true,
                        message: "Se ha actualizado correctamente la informaciób de la tarjeta",
                        dataCard: [response]
                    }
                }
                

            } catch (error) {
                console.log({error});
                return {
                    status: false,
                    message: "Hubo un error"
                }
            }
        },
        deleteCard: async (_:void, args: {customerId: string, tokenCard: string}) =>{
            try {

                const response = await card.deleteCard(args.customerId, args.tokenCard);
                
                if(!response.deleted){
                    return {
                        status: false,
                        message: "No se pudo eliminar la tarjeta",
                    }
                }else {
                    return {
                        status: true,
                        message: "Se ha eliminado la tarjeta"
                    }
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

export default mutationCardStripeResolvers;