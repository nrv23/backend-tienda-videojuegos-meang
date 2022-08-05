import { GenreController } from './../../controllers/genre';
import { IResolvers } from '@graphql-tools/utils';
const genre = new GenreController();

const resolversGenresMutation : IResolvers = {
    Mutation: {
        addGenre: async(_:void, args:{genre: string} ) => {

            try {

                const response = await genre.addGenre(args.genre);

                if(response === 0) {
                    return {
                        status: false,
                        message: "Debe enviar una descripción válida",
                        genre: null
                    }
                }
                else if(response === 1) {
                    // ya existe el slug
                    return {
                        status: false,
                        message: "No puede agregar un género que existe anteriormente",
                        genre: null
                    }

                } else if(typeof response !== "number") {
                    // se insertó el slug

                    return {
                        status: false,
                        message: "Se ha agregado el género con éxito",
                        genre: [response]
                    }

                } else {
                    // no se pudo insertar

                    return {
                        status: false,
                        message: "No se pudo agregar el género",
                        genre: null
                    }

                }
            } catch (error) {

                console.log({error});

                return {
                    status: false,
                    message: "Hubo un error",
                    genre: null
                }
                
            }
        }
    }
}

export default resolversGenresMutation;