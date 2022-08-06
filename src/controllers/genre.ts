import { Genre } from "../models/genre.model";
import { GenreService } from "../services/genre";
import slug from 'slug';

export class GenreController {

    constructor() {

    }

    private genre: GenreService = new GenreService();

    public async getGenres(page: number = 1, itemsPage: number = 20) {

        const { genres, resultPagination } = await this.genre.getGenres(page, itemsPage);

        return { 
            genres: genres as unknown as Array<Genre>, 
            resultPagination 
        };
    }

    private async existGenre(genre: string,tipo:string) {

        if(!genre) {
            return 0;
        }

        // validar que el genero no exista 
        const existGenreResponse = await this.genre.existGenre(genre);

        if(tipo === "update" || tipo === "delete") {

            if(Number(existGenreResponse?.length) === 0) {
                return 1;
            }
    
            return 2;

        } else {

            if(Number(existGenreResponse?.length) > 0) {
                return 1;
            }
    
            return 2;
        }
    }

    public async getGenre(id: string) {
        
        const response = await this.genre.getGenre(id);
        if(response) {
            return [response as unknown as Genre];
        } else {
            return null;
        }
    }

    public async addGenre(genre: string) {

        // validar que el genero no exista 
        const existGenre = await this.existGenre(genre,"add");

        if(existGenre === 0 || existGenre === 1) {
            return existGenre;
        }

        // generar el slug y el id
        const response = (await this.genre.getId())[0] as Genre;
        const newGenre = new Genre(genre,slug(genre.toLowerCase()),(Number(response.id as unknown) + 1).toString());

        const newGenreResponse = await this.genre.addGenre(newGenre);
        if(newGenreResponse?.insertedId) {
            return newGenre;
        } else {
            return 2;
        }
    }

    public async updateGenre(genre: Genre) {

        // validar que el genero no exista 
        const existGenre = await this.existGenre(genre.id as string,"update");
        
        if(existGenre === 0 || existGenre === 1) {
            return existGenre;
        }

        // generar el slug y el id
        const updateGenre = new Genre(genre.name,slug(genre.name.toLowerCase()),Number(genre.id as unknown).toString());
        const updateGenreResponse = await this.genre.updateGenre(updateGenre);
        if (updateGenreResponse?.modifiedCount === 0) {
            return 2;
        } else {
            return updateGenre;
        }

    }

    public async deleteGenre(id: string) {

        const existGenre = await this.existGenre(id,"delete");
        
        if(existGenre === 0 || existGenre === 1) {
            return existGenre;
        }


        const deleteGenreResponse = await this.genre.deleteGenre(id);

        if(deleteGenreResponse?.deletedCount === 0) {
            return 2
        } else {

            return "Se ha eliminado el género correctamente"
        }
    }
}