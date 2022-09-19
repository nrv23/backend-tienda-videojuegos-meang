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
const genre_1 = require("./../../controllers/genre");
const genre = new genre_1.GenreController();
const resolversGenresMutation = {
    Mutation: {
        addGenre: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield genre.addGenre(args.genre);
                if (response === 0) {
                    return {
                        status: false,
                        message: "Debe enviar una descripción válida",
                        genre: null
                    };
                }
                else if (response === 1) {
                    return {
                        status: false,
                        message: "No puede agregar un género que existe anteriormente",
                        genre: null
                    };
                }
                else if (typeof response !== "number") {
                    return {
                        status: true,
                        message: "Se ha agregado el género con éxito",
                        genre: [response]
                    };
                }
                else {
                    return {
                        status: false,
                        message: "No se pudo agregar el género",
                        genre: null
                    };
                }
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                    genre: null
                };
            }
        }),
        updateGenre: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield genre.updateGenre(args.genre);
                if (typeof response !== "number") {
                    return {
                        status: true,
                        message: "Se ha actualizado el género con éxito",
                        genre: [response]
                    };
                }
                else if (response === 0) {
                    if (response === 0) {
                        return {
                            status: false,
                            message: "Debe enviar un id válido",
                            genre: null
                        };
                    }
                }
                else if (response === 1) {
                    return {
                        status: false,
                        message: "No existe el género asociado a ese id",
                        genre: null
                    };
                }
                else {
                    return {
                        status: false,
                        message: "No se pudo actualizar el género",
                        genre: null
                    };
                }
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                    genre: null
                };
            }
        }),
        deleteGenre: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield genre.deleteGenre(args.id);
                if (typeof response === "string") {
                    return {
                        status: true,
                        message: "Se ha eliminado correctamente",
                        genre: null
                    };
                }
                else if (response === 0) {
                    return {
                        status: false,
                        message: "Debe enviar un id válido",
                        genre: null
                    };
                }
                else if (response === 1) {
                    return {
                        status: false,
                        message: "No existe ningún genero asociado con ese id",
                        genre: null
                    };
                }
                else {
                    return {
                        status: false,
                        message: "No se pudo eliminar el género",
                        genre: null
                    };
                }
            }
            catch (error) {
                return {
                    status: false,
                    message: "Hubo un error",
                    genre: null
                };
            }
        }),
        blockGenre: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(args);
                const response = yield genre.blockGenre(args.id, args.active);
                if (response === 1) {
                    return {
                        status: true,
                        message: "Se ha modificado el estado del género",
                        genre: null
                    };
                }
                else {
                    return {
                        status: false,
                        message: "No se pudo modificar el estado del género",
                        genre: null
                    };
                }
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                    genre: null
                };
            }
        })
    }
};
exports.default = resolversGenresMutation;
