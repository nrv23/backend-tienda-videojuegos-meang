import { userRow } from './../interface/user.interface';
import { InsertManyResult, WithId } from "mongodb";
import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";
import { User } from "../models/user.model";

export class UserService {

    constructor() {

    }

    public async getLastId() {

        const connection = await db;
        return connection?.collection<WithId<Document>>(COLLECTIONS.USERS).find().limit(1).sort({registerDate: -1}).toArray();
    }

    public async register(user: User) {

        const connection = await db;
        return connection?.collection(COLLECTIONS.USERS).insertOne(user);
    }

    public async getUsers() {

        const connection = await db;

        return connection?.collection(COLLECTIONS.USERS).find().sort({registerDate: -1}).toArray();

    }

    public async login(email: string) {

        const connection = await db;

        return connection?.collection(COLLECTIONS.USERS).findOne({email});
    }

    
}
