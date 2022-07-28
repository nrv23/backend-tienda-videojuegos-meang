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
                try {
                    const { name, lastName, email, password, role, birthDate } = args.user;
                    const registerResponse = yield user.register(name, lastName, email, password, role, birthDate);
                    if (!registerResponse) {
                        return "No se pudo agregar el usuario";
                    }
                    else if (registerResponse === "existe") {
                        return "No puede registrar un usuario que ya existe anteriormente";
                    }
                    return "Usuario agregado con éxito";
                }
                catch (error) {
                    console.log({ error });
                    return "Error al agregar el usuario";
                }
            }
            catch (error) {
                console.log({ error });
            }
        }),
    },
};
exports.default = mutationResolvers;
