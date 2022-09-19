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
const users_1 = require("../../controllers/users");
const user = new users_1.UserController();
const mutationResolvers = {
    Mutation: {
        register: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { name, lastName, email, password, role, birthDate } = args.user;
                const registerResponse = yield user.register(name, lastName, email, password, role, birthDate, args.user.active !== null && typeof args.user.active !== 'undefined' ? args.user.active : true);
                if (registerResponse === 0) {
                    return {
                        status: false,
                        message: "No se pudo validar el usuario"
                    };
                }
                else if (registerResponse === 1) {
                    return {
                        status: false,
                        message: "No puede registrar un usuario que ya existe anteriormente"
                    };
                }
                else if (registerResponse === 2) {
                    return {
                        status: false,
                        message: "No pudo registrar el usuario"
                    };
                }
                return {
                    status: true,
                    message: registerResponse.message,
                    users: [registerResponse.user]
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Error al registrar el usuario"
                };
            }
        }),
        updateUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log({ user: args.user });
                const updatedResponse = yield user.updateUser(args.user, context.token);
                if (updatedResponse === 0) {
                    return {
                        status: false,
                        message: "No se pudo validar el usuario"
                    };
                }
                else if (updatedResponse === 1) {
                    return {
                        status: false,
                        message: "No puede actualizar un usuario que no existe"
                    };
                }
                else if (updatedResponse === 2) {
                    return {
                        status: false,
                        message: "No se pudo actualizar el usuario"
                    };
                }
                return {
                    status: true,
                    message: updatedResponse
                };
            }
            catch (error) {
                console.log(error);
                const errorResponse = error;
                if (errorResponse.message === "TOKEN_VENCIDO") {
                    return {
                        status: false,
                        message: "Se ha vencido la sesión"
                    };
                }
                return {
                    status: false,
                    message: "Error al actualizar el usuario"
                };
            }
        }),
        deleteUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const deletedResponse = yield user.deleteUser(args.id, context.token);
                if (deletedResponse === 0) {
                    return {
                        status: false,
                        message: "No se pudo validar el usuario"
                    };
                }
                else if (deletedResponse === 1) {
                    return {
                        status: false,
                        message: "No puede eliminar un usuario que no existe"
                    };
                }
                else if (deletedResponse === 2) {
                    return {
                        status: false,
                        message: "No se pudo eliminar el usuario"
                    };
                }
                return {
                    status: true,
                    message: deletedResponse
                };
            }
            catch (error) {
                console.log(error);
                const errorResponse = error;
                if (errorResponse.message === "TOKEN_VENCIDO") {
                    return {
                        status: false,
                        message: "Se ha vencido la sesión"
                    };
                }
                return {
                    status: false,
                    message: "Error al eliminar el usuario"
                };
            }
        }),
        blockUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, active } = args;
                const { token } = context;
                const blockUserResponse = yield user.blockUser(id, active, token);
                if (blockUserResponse === 0) {
                    return {
                        status: false,
                        message: "No se pudo validar el usuario"
                    };
                }
                else if (blockUserResponse === 1) {
                    return {
                        status: false,
                        message: "No puede bloquear un usuario que no existe"
                    };
                }
                else if (blockUserResponse === 2) {
                    return {
                        status: false,
                        message: "No se pudo bloquear el usuario"
                    };
                }
                return {
                    status: true,
                    message: blockUserResponse
                };
            }
            catch (error) {
                console.log(error);
                const errorResponse = error;
                if (errorResponse.message === "TOKEN_VENCIDO") {
                    return {
                        status: false,
                        message: "Se ha vencido la sesión"
                    };
                }
                return {
                    status: false,
                    message: "Error al bloquear el usuario"
                };
            }
        }),
        activeUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield user.activeUser(+args.id, context.token, args.password, args.birthDate);
                if (response === 0) {
                    return {
                        status: false,
                        message: "Debe enviar un id de usuario válido"
                    };
                }
                else if (response === 1) {
                    return {
                        status: false,
                        message: "No existe el usuario con el id" + args.id
                    };
                }
                else if (response === 2) {
                    return {
                        status: false,
                        message: "No se pudo activar el usuario"
                    };
                }
                else if (response === 3) {
                    return {
                        status: false,
                        message: "El parámetro id del usuario no corresponde con el id de la sesión"
                    };
                }
                else {
                    return {
                        status: true,
                        message: response
                    };
                }
            }
            catch (error) {
                console.log(error);
                const errorResponse = error;
                if (errorResponse.message === "TOKEN_VENCIDO") {
                    return {
                        status: false,
                        message: "Se ha vencido la sesión"
                    };
                }
                return {
                    status: false,
                    message: "Error al activar el usuario"
                };
            }
        }),
        resetPassword: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield user.resetPass(args.id, context.token, args.password);
                if (response === 0) {
                    return {
                        status: false,
                        message: "Debe enviar un id de usuario válido"
                    };
                }
                else if (response === 1) {
                    return {
                        status: false,
                        message: "No existe el usuario con el id" + args.id
                    };
                }
                else if (response === 2) {
                    return {
                        status: false,
                        message: "No se pudo cambiar la contraseña del usuario"
                    };
                }
                else if (response === 3) {
                    return {
                        status: false,
                        message: "El parámetro id del usuario no corresponde con el id de la sesión"
                    };
                }
                else {
                    return {
                        status: true,
                        message: response
                    };
                }
            }
            catch (error) {
                console.log(error);
                const errorResponse = error;
                if (errorResponse.message === "TOKEN_VENCIDO") {
                    return {
                        status: false,
                        message: "Se ha vencido la sesión"
                    };
                }
                return {
                    status: false,
                    message: "Error al actualizar el usuario"
                };
            }
        })
    },
};
exports.default = mutationResolvers;
