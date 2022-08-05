import { Genre } from "../models/genre.model";
import { GenreService } from "../services/genre";
import slug from 'slug';

export class GenreController {

    constructor() {

    }

    private genre: GenreService = new GenreService();

    public getGenres() {
        return this.genre.getGenres() as unknown as Array<Genre>;
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

        if(!genre) {
            return 0;
        }

        // validar que el genero no exista 
        const existGenre = await this.genre.existGenre(genre) as Genre;

        if(existGenre) {
            return 1;
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
}