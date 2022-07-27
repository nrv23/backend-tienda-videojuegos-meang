import  dotenv  from 'dotenv';

//process.env.NODE_ENV ="production";

if(process.env.NODE_ENV !== "production") {
    dotenv.config({path: "./src/.env"});
}

const DBNAME = process.env.DB_NAME;
const DBURL = process.env.DB_URL;
export const SECRET_KEY= process.env.SECRET; 
export const DATABASE= `${DBURL}${DBNAME}`; 

export enum COLLECTIONS  {
    USERS = "users"
}

export enum EXPRES_IN {
    H1=  60*60,
    h24 = 24*60*60,
    M15 = H1 / 4
}

export const saltRounds = 10;