import { Context } from './interface/Context.interface';
import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { createServer, Server } from "http";

class GraphQLServer {
  // Propiedades
  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT = process.env.PORT
    ? Number(process.env.PORT)
    : 5000;
  private schema!: GraphQLSchema;
  constructor(schema: GraphQLSchema) {
    if (schema === undefined) {
      throw new Error(
        "Necesitamos un schema de GraphQL para trabajar con APIs GraphQL"
      );
    }
    this.schema = schema;
    this.init();
  }

  private init() {
    //this.initializeEnviroments();
    this.configExpress();
    this.configApolloServerExpress();
    this.configRoutes();
  }

  /*private initializeEnviroments(): void {
    if (process.env.NODE_ENV !== "production") { // si el ambiente no es produccion use las variables del archivo .env
      const envs = result;
      console.log(envs);
    }
  }*/

  private configExpress() {
    this.app = express();
    this.app.use(compression());
    this.httpServer = createServer(this.app);
  }

  private async configApolloServerExpress() {

    const context = async ({ req, connection }: Context) => { // el objeto req lee la cabecera donde viene el token
      // connection se usa para los querys de tipo subscription
      const token: string = req ? req.headers.authorization as string : connection.authorization;
      console.log({token});
      return {
        token
      }
    }
    const apolloServer = new ApolloServer({
      schema: this.schema,
      introspection: true, // permitir que todo el schema sea visible en el playground
      context
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: this.app, cors: true });
  }

  private configRoutes() {
    this.app.get("/hello", (_, res) => {
      res.send("Bienvenid@s al primer proyecto");
    });

    this.app.get("/", (_, res) => {
      res.redirect("/graphql");
    });
  }

  listen(callback: (port: number) => void): void {
    this.httpServer.listen(+this.DEFAULT_PORT, () => {
      console.log("desde listen");

      callback(+this.DEFAULT_PORT);
    });
  }
}
//hacer declaracion hoy sin falta
export default GraphQLServer;
