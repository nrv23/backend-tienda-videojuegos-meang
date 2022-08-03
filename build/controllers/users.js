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
exports.UserController = void 0;
const bcrypt_1 = require("./../helper/bcrypt");
const user_model_1 = require("../models/user.model");
const users_1 = require("./../services/users");
const jwt_1 = require("../helper/jwt");
class UserController {
    constructor() {
        this.user = new users_1.UserService();
        this.jwt = new jwt_1.Jwt();
        this.bcrypt = new bcrypt_1.Bcrypt();
    }
    register(name, lastName, email, password, role, birthDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.user.login(email);
            if (exist) {
                return "existe";
            }
            const lastIdResponse = yield this.user.getLastId();
            let id = 0;
            if ((lastIdResponse === null || lastIdResponse === void 0 ? void 0 : lastIdResponse.length) === 0) {
                id = 1;
            }
            else {
                id = Number(lastIdResponse === null || lastIdResponse === void 0 ? void 0 : lastIdResponse.length) + 1;
            }
            password = (yield this.bcrypt.encryptPass(password));
            const user = new user_model_1.User(id, name, lastName, email, password, role, birthDate, new Date().toISOString());
            const registerResponse = yield this.user.register(user);
            if (!(registerResponse === null || registerResponse === void 0 ? void 0 : registerResponse.insertedId)) {
                return false;
            }
            ;
            return true;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.getUsers();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let loginResponse = yield this.user.login(email);
            if (!loginResponse) {
                return 0;
            }
            else {
                if (!(yield this.bcrypt.verifyPassword(password, loginResponse.password))) {
                    return 1;
                }
                else {
                    loginResponse === null || loginResponse === void 0 ? true : delete loginResponse.password;
                    return this.jwt.sign(loginResponse);
                }
            }
        });
    }
    getMe(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verified = this.jwt.verify(token);
            if (!verified) {
                return "El token es inválido o la sesión ha expirado";
            }
            else {
                return verified;
            }
        });
    }
}
exports.UserController = UserController;
