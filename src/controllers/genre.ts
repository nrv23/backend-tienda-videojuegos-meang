import { Genre } from "../models/genre.model";
import { GenreService } from "../services/genre";

export class GenreController {

    constructor() {

    }

    private genre: GenreService = new GenreService();

    public getGenres() {

        return this.genre.getUsers() as unknown as Array<Genre>;
    }
}