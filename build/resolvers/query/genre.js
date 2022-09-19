"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const genre_1 = require("../../controllers/genre");
const genre = new genre_1.GenreController();
const queryGenreResolvers = {
    Query: {
        genres: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { genres, resultPagination } = yield genre.getGenres(args.page, args.items);
                return {
                    status: true,
                    message: "",
                    genre: genres,
                    info: resultPagination
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                    genres: null
                };
            }
        }),
        genre: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return {
                    status: true,
                    message: "",
                    genre: yield genre.getGenre(args.id)
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                    genres: null
                };
            }
        })
    }
};
exports.default = queryGenreResolvers;
