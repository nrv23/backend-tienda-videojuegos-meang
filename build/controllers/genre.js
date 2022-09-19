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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreController = void 0;
const genre_model_1 = require("../models/genre.model");
const genre_1 = require("../services/genre");
const slug_1 = __importDefault(require("slug"));
class GenreController {
    constructor() {
        this.genre = new genre_1.GenreService();
    }
    getGenres(page = 1, itemsPage = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            const { genres, resultPagination } = yield this.genre.getGenres(page, itemsPage);
            return {
                genres: genres,
                resultPagination
            };
        });
    }
    existGenre(genre, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!genre) {
                return 0;
            }
            const existGenreResponse = yield this.genre.existGenre(genre);
            if (tipo === "update" || tipo === "delete") {
                if (Number(existGenreResponse === null || existGenreResponse === void 0 ? void 0 : existGenreResponse.length) === 0) {
                    return 1;
                }
                return 2;
            }
            else {
                if (Number(existGenreResponse === null || existGenreResponse === void 0 ? void 0 : existGenreResponse.length) > 0) {
                    return 1;
                }
                return 2;
            }
        });
    }
    getGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.genre.getGenre(id);
            if (response) {
                return [response];
            }
            else {
                return null;
            }
        });
    }
    addGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            const existGenre = yield this.existGenre(genre, "add");
            if (existGenre === 0 || existGenre === 1) {
                return existGenre;
            }
            const response = (yield this.genre.getId())[0];
            const newGenre = new genre_model_1.Genre(genre, (0, slug_1.default)(genre.toLowerCase()), (Number(response.id) + 1).toString());
            const newGenreResponse = yield this.genre.addGenre(newGenre);
            if (newGenreResponse === null || newGenreResponse === void 0 ? void 0 : newGenreResponse.insertedId) {
                return newGenre;
            }
            else {
                return 2;
            }
        });
    }
    updateGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            const existGenre = yield this.existGenre(genre.id, "update");
            if (existGenre === 0 || existGenre === 1) {
                return existGenre;
            }
            const updateGenre = new genre_model_1.Genre(genre.name, (0, slug_1.default)(genre.name.toLowerCase()), Number(genre.id).toString());
            const updateGenreResponse = yield this.genre.updateGenre(updateGenre);
            if ((updateGenreResponse === null || updateGenreResponse === void 0 ? void 0 : updateGenreResponse.modifiedCount) === 0) {
                return 2;
            }
            else {
                return updateGenre;
            }
        });
    }
    deleteGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existGenre = yield this.existGenre(id, "delete");
            if (existGenre === 0 || existGenre === 1) {
                return existGenre;
            }
            const deleteGenreResponse = yield this.genre.deleteGenre(id);
            if ((deleteGenreResponse === null || deleteGenreResponse === void 0 ? void 0 : deleteGenreResponse.deletedCount) === 0) {
                return 2;
            }
            else {
                return "Se ha eliminado el género correctamente";
            }
        });
    }
    blockGenre(id, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.genre.blockGenre(id, active);
            if ((response === null || response === void 0 ? void 0 : response.modifiedCount) === 0) {
                return 0;
            }
            return 1;
        });
    }
}
exports.GenreController = GenreController;
