import { STATE_VALUES_FILTER } from './../config/constant';
import { ShopProduct } from './../models/shop-product.model';
import { ShopProductService } from './../services/shop-product';


export class ShopProductController {

    private shopProduct: ShopProductService;

    constructor() {

        this.shopProduct = new ShopProductService();
    }


    public async getShopProducts(page: number = 1, itemsPage: number = 20, active: STATE_VALUES_FILTER = STATE_VALUES_FILTER.ACTIVE) {

        const { shopProducts, resultPagination } = await this.shopProduct.getShopProducts(page, itemsPage,active);

        return { 
            shopProducts: shopProducts as unknown as Array<ShopProduct>, 
            resultPagination 
        };
    }
}