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
exports.GenreService = void 0;
const constant_1 = require("../config/constant");
const connection_1 = __importDefault(require("../helper/connection"));
const query_1 = require("../helper/query");
class GenreService {
    constructor() {
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return (0, query_1.getLastId)(connection, constant_1.COLLECTIONS.GENRES);
        });
    }
    getGenres(page, itemsPage, filter = {
        active: {
            $ne: false
        }
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            const paginationOptions = yield (0, query_1.pagination)(connection, constant_1.COLLECTIONS.GENRES, page, itemsPage, filter);
            const genres = connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.GENRES).find(filter).limit(paginationOptions.itemsPage).skip(paginationOptions.skip).sort({ id: 1 }).toArray();
            return {
                genres,
                resultPagination: paginationOptions
            };
        });
    }
    getGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.GENRES).findOne({ id });
        });
    }
    addGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            genre.active = true;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.GENRES).insertOne(genre);
        });
    }
    existGenre(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.GENRES).find({ $or: [{ id: name }, { name }] }).toArray();
        });
    }
    updateGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.GENRES).updateOne({ id: genre.id }, {
                $set: {
                    name: genre.name,
                    slug: genre.slug
                }
            });
        });
    }
    deleteGenre(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.GENRES).deleteOne({ id });
        });
    }
    blockGenre(id, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.GENRES).updateOne({ id: String(id) }, {
                $set: {
                    active: active
                }
            });
        });
    }
}
exports.GenreService = GenreService;
