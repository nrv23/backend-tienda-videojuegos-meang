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
    randmon?: boolean // valores aleatorios,
  ) {
    const response = await this.shopProduct.getShopProducts(
      page,
      itemsPage,
      active,
      platform_id,
      randmon
    );
    if (!randmon) {
      const { shopProducts, resultPagination } = response;

      return {
        shopProducts,
        resultPagination,
      };
    } else {
      const { info, shopProducts } = response;

      return {
        shopProducts,
        resultPagination: info,
      };
    }
  }

  async getProductsOffers(
    page: number = 1,
    itemsPage: number = 20,
    active: STATE_VALUES_FILTER = STATE_VALUES_FILTER.ACTIVE,
    randmon?: boolean,
    topPrice: number = 1,
    lastUnits: number = 1
  ) {

    console.log({lastUnits});
    console.log({topPrice});
    
    let filters = {};

    if (lastUnits > 10 && topPrice > 10) {
      console.log("3");
      
      filters = {
        $and: [
          {
            price: {
              // menor o igual al topprice de parametro
              $lte: topPrice,
            },
          },
          {
            stock: {
              // menor o igual al topprice de parametro
              $lte: topPrice,
            },
          },
        ],
      };
    } else if (lastUnits <= 0 && topPrice > 10) {
      // casi agotado con precios bajos
      console.log("2");
      
      filters = {
        price: {
          // menor o igual al topprice de parametro
          $lte: topPrice,
        },
      };
    }


    else if (lastUnits > 0 && topPrice <= 10) {
      // agotado
      console.log("1")
      filters = {
        stock: {
          // menor o igual al topprice de parametro
          $lte: lastUnits,
        },
      };
    }


    const response = await this.shopProduct.getShopProducts(
      page,
      itemsPage,
      active,
      "",
      randmon,
      filters
    );
    if (!randmon) {
      const { shopProducts, resultPagination } = response;

      return {
        shopProducts,
        resultPagination,
      };
    } else {
      const { info, shopProducts } = response;

      return {
        shopProducts,
        resultPagination: info,
      };
    }
  }
}
