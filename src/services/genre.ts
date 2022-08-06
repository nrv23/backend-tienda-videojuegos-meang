import { Db } from 'mongodb';
import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";
import getLastId from "../helper/query";
import { Genre } from "../models/genre.model";

export class GenreService {

    constructor() {

    }

    public async getId() {
        const connection = await db;
        return getLastId(connection as Db,COLLECTIONS.GENRES);
    }

    public async getGenres() {
        const connection = await db;
        return connection?.collection(COLLECTIONS.GENRES).find().sort({registerDate: -1}).toArray();
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