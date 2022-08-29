import { IResolvers } from '@graphql-tools/utils';


const queryResolversShopProducts: IResolvers = {

    Query : {
        showProducts: async(_:void, args: { page: number, items: number, active?: string}, context: { token: string }) => {

            try {
                
            } catch (error) {
                
            }
        }
    }
}


export default queryResolversShopProducts;