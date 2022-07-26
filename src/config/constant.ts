import  dotenv  from 'dotenv';

//process.env.NODE_ENV ="production";

if(process.env.NODE_ENV !== "production") {
    dotenv.config({path: "./src/.env"});
}

const DBNAME = process.env.DB_NAME;
const DBURL = process.env.DB_URL;
export const SECRET_KEY= process.env.SECRET; 
export const DATABASE= `${DBURL}${DBNAME}`; 

