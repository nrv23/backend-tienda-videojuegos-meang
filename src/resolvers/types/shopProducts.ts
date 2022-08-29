import { ShopProduct } from '../../models/shop-product.model';
import { IResolvers } from '@graphql-tools/utils';


const typeShopProductResolvers: IResolvers = {

    ShopProduct: {

        platformId: (parent: ShopProduct) => parent.platform_id,
        productId: (parent: ShopProduct) => parent.product_id,
    }
}

export default typeShopProductResolvers;