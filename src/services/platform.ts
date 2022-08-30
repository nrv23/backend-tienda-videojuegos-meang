import { Platform } from "../models/platform.model";
import { STATE_VALUES_FILTER } from './../config/constant';
import { IPaginationOptions } from './../interface/PaginationOptions.interface';
import { Db } from 'mongodb';
import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";
import {getLastId, pagination} from "../helper/query";


export class PlatformService {

    constructor() {

    }

    public async getId() {
        const connection = await db;
        return getLastId(connection as Db,COLLECTIONS.PLATFORMS);
    }

    public async getPlatform(id:string | number)  {

        const connection = await db;
        return connection?.collection<Platform>(COLLECTIONS.PLATFORMS).findOne({id: String(id)});
        //se puede usar una interfaz en el collection para indicar que la respuesta va ser un tipo especific
    }
}