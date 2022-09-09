import { ShopProductController } from './../../controllers/shop-product';
import { PlatformController } from './../../controllers/platform';
import { ProductController } from './../../controllers/product';
import { ShopProduct } from '../../models/shop-product.model';
import { IResolvers } from '@graphql-tools/utils';

const product = new ProductController();
const platfotm = new PlatformController();
const shopProduct = new ShopProductController();

const typeShopProductResolvers: IResolvers = {

    ShopProduct: {

        platformId: (parent: ShopProduct) => parent.platform_id,
        productId: (parent: ShopProduct) => parent.product_id,
        product: async (parent: ShopProduct) => await product.getProduct(parent.product_id),
        platform: async (parent: ShopProduct) => await platfotm.getPlatform(parent.platform_id.toString()),
        relationalProducts: async (parent: ShopProduct) => await shopProduct.getRelationalProducts(parent.product_id,parent.id)
    }
}

export default typeShopProductResolvers;