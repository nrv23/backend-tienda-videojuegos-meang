import { STATE_VALUES_FILTER } from './../config/constant';
import { ShopProduct } from './../models/shop-product.model';
import { IPaginationOptions } from './../interface/PaginationOptions.interface';
import { Db } from 'mongodb';
import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";
import {getLastId, pagination} from "../helper/query";

export class ShopProductService {

    constructor() {

    }

    public async getId() {
        const connection = await db;
        return getLastId(connection as Db,COLLECTIONS.SHOP_PRODUCTS);
    }

    public async getShopProducts(page: number,itemsPage: number, active: STATE_VALUES_FILTER, platform_id?: string) {
        let filter: object =  {

        }
        if(active ===  STATE_VALUES_FILTER.ACTIVE) {
            filter = {
                active: {
                    $ne: false
                }
            }
        } else if(active ===  STATE_VALUES_FILTER.INACTIVE) {
            filter = {
                active: false
            }
        } else {
            filter = {};
        }
        
        if(platform_id) {
            filter = {...filter, platform_id}
        }

        console.log(filter)
        
        const connection = await db;
        const paginationOptions:IPaginationOptions = await pagination(connection as Db,COLLECTIONS.SHOP_PRODUCTS,page,itemsPage,filter);
    
        const shopProducts = connection?.collection(COLLECTIONS.SHOP_PRODUCTS)
            .find(filter)
            .limit(paginationOptions.itemsPage)
            .skip(paginationOptions.skip)
            .sort({id: 1})
            .toArray();
        
        return {
            shopProducts,
            resultPagination: paginationOptions
        }
    }
}