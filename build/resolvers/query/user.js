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
const users_1 = require("./../../controllers/users");
const user = new users_1.UserController();
const queryResolvers = {
    Query: {
        users: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { users, resultPagination: info } = yield user.getUsers(args.page, args.items, args.active);
                return {
                    info,
                    status: true,
                    message: "",
                    users
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Error al cargar la lista de usuarios",
                    users: null
                };
            }
        }),
        login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const loginResponse = yield user.login(args.email, args.password);
                if (loginResponse === 0) {
                    return {
                        status: false,
                        message: "No existe el usuario",
                        token: null
                    };
                }
                else if (loginResponse === 1) {
                    return {
                        status: false,
                        message: "Datos de autenticación incorrectos",
                        token: null
                    };
                }
                else if (loginResponse === 2) {
                    return {
                        status: false,
                        message: "La cuenta está bloqueada. Contacte al administrador",
                        token: null
                    };
                }
                else {
                    return {
                        status: true,
                        message: "Login exitoso",
                        token: loginResponse
                    };
                }
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Error al intentar hacer login",
                    user: null
                };
            }
        }),
        me: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const meResponse = yield user.getMe(context.token);
                if (typeof meResponse === "string") {
                    return {
                        status: false,
                        message: meResponse
                    };
                }
                else {
                    const { user } = meResponse;
                    return {
                        status: true,
                        message: "",
                        users: [user]
                    };
                }
                return null;
            }
            catch (error) {
                console.log({ error });
            }
        })
    },
};
exports.default = queryResolvers;
