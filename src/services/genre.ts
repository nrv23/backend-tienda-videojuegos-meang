import { IPaginationOptions } from './../interface/PaginationOptions.interface';
import { Db } from 'mongodb';
import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";
import {getLastId, pagination} from "../helper/query";
import { Genre } from "../models/genre.model";

export class GenreService {

    constructor() {

    }

    public async getId() {
        const connection = await db;
        return getLastId(connection as Db,COLLECTIONS.GENRES);
    }

    public async getGenres(page: number,itemsPage: number) {
        
        const connection = await db;
        const paginationOptions:IPaginationOptions = await pagination(connection as Db,COLLECTIONS.GENRES,page,itemsPage);
    
        const genres = connection?.collection(COLLECTIONS.GENRES)
            .find({})
            .limit(paginationOptions.itemsPage)
            .skip(paginationOptions.skip)
            .sort({id: 1})
            .toArray();
        
        return {
            genres,
            resultPagination: paginationOptions
        }
    }

    public async getGenre(id: string) {
        const connection = await db;
        return connection?.collection(COLLECTIONS.GENRES).findOne({id});
    }

    public async addGenre(genre: Genre) {
        const connection = await db;
        return connection?.collection(COLLECTIONS.GENRES).insertOne(genre);
    }

    public async existGenre(name: string) {
        const connection = await db;
        return connection?.collection(COLLECTIONS.GENRES).find({$or: [{id: name},{name}]}).toArray();
    }
    
    public async updateGenre(genre: Genre) {

        const connection = await db;
        /*  
            Importante:

            El paramrtro de filtro debe ser del mismo tipo de dato que la columna de filtro

        */
        return connection?.collection(COLLECTIONS.GENRES).updateOne({id: genre.id },{
            $set:{
                name: genre.name,
                slug: genre.slug
            }
        });
    }

    public async deleteGenre(id: string) {

        const connection = await db;

        return connection?.collection(COLLECTIONS.GENRES).deleteOne({id});
    }
}