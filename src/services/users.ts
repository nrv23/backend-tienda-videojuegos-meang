import { IPaginationOptions } from './../interface/PaginationOptions.interface';
import { userRow } from './../interface/user.interface';
import { Db, InsertManyResult, WithId } from "mongodb";
import { COLLECTIONS } from "../config/constant";
import db from "../helper/connection";
import { User } from "../models/user.model";
import { getLastId as _getLastId, pagination } from '../helper/query';

export class UserService {

    constructor() {

    }

    public async getLastId() {

        const connection = await db;
        return _getLastId(connection as Db,COLLECTIONS.USERS)
    }

    public async register(user: User) {

        const connection = await db;
        return connection?.collection(COLLECTIONS.USERS).insertOne(user);
    }

    public async getUsers(page: number, items: number,filter: object = {
        active: {
            $ne: false
        }
    }) {

        const connection = await db;
        const paginationOptions:IPaginationOptions = await pagination(connection as Db,COLLECTIONS.USERS,page,items,filter);

        const users = connection?.collection(COLLECTIONS.USERS)
                .find(filter)
                .limit(paginationOptions.itemsPage)
                .skip(paginationOptions.skip)
                .sort({id: 1})
                .toArray();
        return {
            users,
            resultPagination: paginationOptions
        }
    }

    public async login(email: string) {

        const connection = await db;
        

        return connection?.collection(COLLECTIONS.USERS).findOne({email});
    }

    public async updateUser(user: User) {

        const connection = await db;
        return connection?.collection(COLLECTIONS.USERS).updateOne({id: Number(user.id)},{
            $set: {
                name: user.name, 
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                role: user.role,
                birthDate : user.birthDate
            }
        })

    }

    public async existUser(value: string | number) {

        const connection = await db;
        return connection?.collection(COLLECTIONS.USERS).find({$or: [{email: String(value)},{id: Number(value)}]}).toArray();
    }

    public async deleteUser(id: number) {

        const connection = await db;
        return connection?.collection(COLLECTIONS.USERS).deleteOne({id: Number(id)});
    }

    public async blockUser(id:number, active:boolean) {

        const connection = await db;
        return connection?.collection(COLLECTIONS.USERS).updateOne({id: Number(id)},{
            $set: {
                active: Boolean(active)
            }
        })
    }

    public async activeUser(id: number, password: string, birthDate: string) {
        const connection = await db;
        return connection?.collection(COLLECTIONS.USERS).updateOne({id: Number(id)},{
            $set: {
                active: true,
                birthDate,
                password
            }
        })
    }

    public async resetPassword(id: number, password: string) {
        const connection = await db;
        return connection?.collection(COLLECTIONS.USERS).updateOne({id: Number(id)},{
            $set: {
                password
            }
        })
    }
    
}
