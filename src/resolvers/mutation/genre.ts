import { GenreController } from './../../controllers/genre';
import { IResolvers } from '@graphql-tools/utils';
const genre = new GenreController();

const resolversGenresMutation : IResolvers = {
    Mutation: {
        addGenre: async(_:void, args:{genre: string} ) => {

            genre.addGenre(""); 
        }
    }
}

export default resolversGenresMutation;