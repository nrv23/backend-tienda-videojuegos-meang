import { STATE_VALUES_FILTER } from "./../config/constant";
import { ShopProduct } from "./../models/shop-product.model";
import { IPaginationOptions } from "./../interface/PaginationOptions.interface";
import { Collection, Db } from "mongodb";
import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";
import { getLastId, pagination, ramdonItems } from "../helper/query";

export class ShopProductService {
  constructor() {}

  public async getId() {
    const connection = await db;
    return getLastId(connection as Db, COLLECTIONS.SHOP_PRODUCTS);
  }

  public async getShopProducts(
    page: number,
    itemsPage: number,
    active: STATE_VALUES_FILTER,
    platform_id?: string,
    random: boolean = false
  ) {
    let filter: object = {};
    if (active === STATE_VALUES_FILTER.ACTIVE) {
      filter = {
        active: {
          $ne: false,
        },
      };
    } else if (active === STATE_VALUES_FILTER.INACTIVE) {
      filter = {
        active: false,
      };
    } else {
      filter = {};
    }

    if (platform_id) {
      filter = { ...filter, platform_id };
    }

    console.log(filter);
    console.log({ random });

    const connection = await db;
    if (!random) {
      const paginationOptions: IPaginationOptions = await pagination(
        connection as Db,
        COLLECTIONS.SHOP_PRODUCTS,
        page,
        itemsPage,
        filter
      );

      const shopProducts = connection
        ?.collection(COLLECTIONS.SHOP_PRODUCTS)
        .find(filter)
        .limit(paginationOptions.itemsPage)
        .skip(paginationOptions.skip)
        .sort({ id: 1 })
        .toArray();

      return {
        shopProducts: shopProducts as unknown as ShopProduct[],
        resultPagination: paginationOptions,
      };
    } else {
      const result = await ramdonItems(
        COLLECTIONS.SHOP_PRODUCTS,
        connection as Db,
        filter,
        itemsPage
      );

      if (result.length === 0 || result.length !== itemsPage) {
        // no trae nada

        return {
          info: {
            page: 1,
            itemsPage,
            total: 0,
            totalPages: 0,
          },
          status: false,
          message: "No se ha podido obtener la información de los productos",
          shopProducts: [],
        };
      }

      return {
        info: {
          page: 1,
          itemsPage,
          total: itemsPage,
          totalPages: 1,
        },
        status: false,
        message: "Se ha cargado correctamente la informaciín de los productos",
        shopProducts: result as ShopProduct[],
      };
    }
  }
}
