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
    USERS = "users",
    GENRES = "genres",
    SHOP_PRODUCTS = "products_platforms"
}

export enum EXPRES_IN {
    H1=  60*60,
    h24 = 24*60*60,
    M15 = H1 / 4
}

export const saltRounds = 10;
export const USER_EMAIL = process.env.USER_EMAIL;
export const USER_PASSWORD = process.env.USER_PASSWORD;
export const CLIENT_URL = process.env.CLIENT_URL;
export enum STATE_VALUES_FILTER  {
    ACTIVE = "ACTIVE",
    ALL = "ALL",
    INACTIVE = "INACTIVE"
}