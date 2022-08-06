import { Genre } from './../../models/genre.model';
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
                        status: true,
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
        },

        updateGenre: async (_: void, args: {genre: Genre}) => {

            try {
                const response = await genre.updateGenre(args.genre);

                if(typeof response !== "number" ) {

                    return {
                        status: true,
                        message: "Se ha actualizado el género con éxito",
                        genre: [response]
                    }
                } else if(response === 0) {

                    if(response === 0) {
                        return {
                            status: false,
                            message: "Debe enviar un id válido",
                            genre: null
                        }
                    }
                } else if(response === 1) {
                    return {
                        status: false,
                        message: "No existe el género asociado a ese id",
                        genre: null
                    }  
                } else {
                    return {
                        status: false,
                        message: "No se pudo actualizar el género",
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
        },
        deleteGenre: async (_:void, args: {id: string}) => {

            try {
    
                const response = await genre.deleteGenre(args.id);
    
                if(typeof response === "string"){
                    return {
                        status: true,
                        message: "Se ha eliminado correctamente",
                        genre: null
                    }
                }
                else if(response === 0) {
    
                    return {
                        status: false,
                        message: "Debe enviar un id válido",
                        genre: null
                    }
                    
                } else if (response === 1) {
                    return {
                        status: false,
                        message: "No existe ningún genero asociado con ese id",
                        genre: null
                    }
                } else {
                    return {
                        status: false,
                        message: "No se pudo eliminar el género",
                        genre: null
                    }
                }
                
            } catch (error) {
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