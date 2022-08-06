import { IResolvers } from '@graphql-tools/utils';
import { GenreController } from '../../controllers/genre';
const genre = new GenreController();
const queryGenreResolvers: IResolvers = {

    Query: {
        genres: async (_:void,args: { page: number, items: number }) => {

            try {   

                const {genres, resultPagination} = await genre.getGenres(args.page, args.items);
                
                return {
                    status: true,
                    message: "",
                    genre: genres,
                    info: resultPagination
                }

            } catch (error) {
                console.log({error});
                return {
                    status: false,
                    message: "Hubo un error",
                    genres: null
                }
            }
        },
        genre: async(_:void, args: {id: string}) => {
           
            try {
                
                return {
                    status: true,
                    message: "",
                    genre: await genre.getGenre(args.id)
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