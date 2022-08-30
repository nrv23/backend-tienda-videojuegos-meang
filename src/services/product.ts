import { Product } from './../models/products.model';
import { STATE_VALUES_FILTER } from './../config/constant';
import { IPaginationOptions } from './../interface/PaginationOptions.interface';
import { Db } from 'mongodb';
import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";
import {getLastId, pagination} from "../helper/query";

export class ProductService {

    constructor() {

    }


    public async getId() {
        const connection = await db;
        return getLastId(connection as Db,COLLECTIONS.PRODUCTS);
    }

    public async getProduct(id:string | number)  {

        const connection = await db;
        return connection?.collection<Product>(COLLECTIONS.PRODUCTS).findOne({id: String(id)});
        //se puede usar una interfaz en el collection para indicar que la respuesta va ser un tipo especific
    }

}