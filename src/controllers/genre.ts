import { Genre } from "../models/genre.model";
import { GenreService } from "../services/genre";

export class GenreController {

    constructor() {

    }

    private genre: GenreService = new GenreService();

    public getGenres() {
        return this.genre.getGenres() as unknown as Array<Genre>;
    }

    public getGenre(id: string) {
        return this.genre.getGenre(id) as unknown as Array<Genre>;
    }

    public async addGenre(genre: string) {

        // generar el slug y el id

        const { id } = (await this.genre.getId())[0] as Genre;
        console.log(id);
        
    }
}