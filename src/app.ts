import GraphQLServer from "./server";
import schema from "./schema";

const graphQLServer = new GraphQLServer(schema);

graphQLServer.listen((port: number) => console.log(`http://localhost:${port}/graphql`));

/*
    Comando para restaurar bases de datos mongo db
    mongorestore -d tienda db/rawg/

    -d para indicar la base de datos
    luego la ubicacion de lo archivos json y bson
    luego darle enter

*/