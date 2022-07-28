import { Request } from "express";

interface Connection {
    authorization: string;
}

export interface Context {
    req: Request;
    connection: Connection;
     
}



