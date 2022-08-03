import { IResolvers } from '@graphql-tools/utils';
import { GenreController } from '../../controllers/genre';
const genre = new GenreController();
const queryGenreResolvers: IResolvers = {

    Query: {
        genres: async (_:void,__:unknown) => {

            try {   
                
                const response = await genre.getGenres();
                
                return {
                    status: true,
                    message: "",
                    genre: response
                }

            } catch (error) {
                console.log({error});
                return {
                    status: false,
                    message: "Hubo un error",
                    genres: null
                }
            }
        }
    }
}

export default queryGenreResolvers;