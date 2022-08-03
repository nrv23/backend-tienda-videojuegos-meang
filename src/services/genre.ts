import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";

export class GenreService {

    constructor() {

    }

    public async getUsers() {
        const connection = await db;
        return connection?.collection(COLLECTIONS.GENRES).find().sort({registerDate: -1}).toArray();
    }
}