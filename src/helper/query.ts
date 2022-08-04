import { Db } from "mongodb";


function getLastId(db:Db, collection: string) {

    return db.collection(collection).find().sort({id: -1}).limit(1).toArray();
}

export default getLastId;