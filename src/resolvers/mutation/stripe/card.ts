import { UserController } from './../../../controllers/users';
import { IResolvers } from '@graphql-tools/utils';
const user = new UserController();

const mutationCardStripeResolvers: IResolvers = {
    Mutation: {
        createCard: async (_:void, args: {customerId:string,tokenCard:string }) => {
            try {

                const response = await user.addTokenCard(args.customerId, args.tokenCard);

                if(response?.modifiedCount === 0){
                    return {
                        status: false,
                        message: "No se pudo configurar el cliente con la información de la tarjeta"
                    }
                }else {
                    return {
                        status: true,
                        message: "Se ha asociado correctamente al cliente con la tarjeta"
                    }
                }
                

            } catch (error) {

                return {
                    status: false,
                    message: "Hubo un error"
                }
            }
        }
    }
}

export default mutationCardStripeResolvers;