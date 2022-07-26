import { Db, MongoClient } from "mongodb";
import chalk from "chalk";
import { DATABASE } from "./constant";
class Database {
    db?: Db;
 
    async init(): Promise<Db | undefined> {
        console.log("================DATABASE================");
        try {
            const MONGODB = DATABASE;
            const mongoClient = await MongoClient.connect(MONGODB?.toString());
 
            this.db = mongoClient.db();
            // Mensaje visual con el estado
            console.log(`STATUS: ${chalk.greenBright("ONLINE")}`);
            console.log(`DATABASE: ${chalk.greenBright(this.db.databaseName)}`);
        } catch(error) {
            console.log(`ERROR: ${error}`);
            console.log(`STATUS: ${chalk.redBright("OFFLINE")}`);
            console.log(`DATABASE: ${chalk.redBright(this.db?.databaseName)}`);
        }
        return this.db;
    }
}
 
export default Database;