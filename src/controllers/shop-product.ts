import { STATE_VALUES_FILTER } from "./../config/constant";
import { ShopProduct } from "./../models/shop-product.model";
import { ShopProductService } from "./../services/shop-product";

export class ShopProductController {
  private shopProduct: ShopProductService;

  constructor() {
    this.shopProduct = new ShopProductService();
  }

  public async getShopProducts(
    page: number = 1,
    itemsPage: number = 20,
    active: STATE_VALUES_FILTER = STATE_VALUES_FILTER.ACTIVE,
    platform_id?: string,
    randmon?: boolean // valores aleatorios
  ) {
    const response = await this.shopProduct.getShopProducts(
        page,
        itemsPage,
        active,
        platform_id,
        randmon
      );
    if(!randmon) {

        const { shopProducts, resultPagination } = response;
    
        return {
        shopProducts,
        resultPagination
        };
    
    } else {

        const { info, shopProducts} = response;

        return {
            shopProducts,
            resultPagination: info
        };
    }
  }
}
