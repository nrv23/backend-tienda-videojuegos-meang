import { STATE_VALUES_FILTER } from "./../../config/constant";
import { ShopProductController } from "./../../controllers/shop-product";
import { IResolvers } from "@graphql-tools/utils";

const shopProduct = new ShopProductController();
const queryResolversShopProducts: IResolvers = {
  Query: {
    showProducts: async (
      _: void,
      args: { page: number; items: number; active?: STATE_VALUES_FILTER },
      context: { token: string }
    ) => {
      try {
        const { shopProducts, resultPagination } =
          await shopProduct.getShopProducts(args.page, args.items, args.active);

        return {
          status: true,
          message: "",
          shopProducts,
          info: resultPagination,
        };
      } catch (error) {
        return {
          status: false,
          message: "Hubo un error en el servidor",
        };
      }
    },
    showProductsPlatforms: async (
      _: void,
      args: {
        page: number;
        items: number;
        active?: STATE_VALUES_FILTER;
        platform_id: string;
      },
      context: { token: string }
    ) => {
      try {

        const { shopProducts, resultPagination } =
          await shopProduct.getShopProducts(args.page, args.items, args.active,args.platform_id);

        return {
          status: true,
          message: "",
          shopProducts,
          info: resultPagination,
        };

      } catch (error) {
        return {
          status: false,
          message: "Hubo un error en el servidor",
        };
      }
    },
  },
};

export default queryResolversShopProducts;
