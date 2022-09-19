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
    existUser(value, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!value) {
                return 0;
            }
            const response = yield this.user.existUser(value);
            if (tipo === "update" || tipo === "delete") {
                if (Number(response === null || response === void 0 ? void 0 : response.length) === 0) {
                    return 1;
                }
                return response;
            }
            else {
                if (Number(response === null || response === void 0 ? void 0 : response.length) > 0) {
                    return 1;
                }
                return response;
            }
        });
    }
    register(name, lastName, email, password, role, birthDate, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield this.existUser(email, "add");
            if (exist === 1 || exist === 0) {
                return exist;
            }
            const lastIdResponse = yield this.user.getLastId();
            let id = 0;
            if ((lastIdResponse === null || lastIdResponse === void 0 ? void 0 : lastIdResponse.length) === 0) {
                id = 1;
            }
            else {
                id = Number(lastIdResponse[0].id) + 1;
            }
            password = (yield this.bcrypt.encryptPass(password));
            const user = new user_model_1.User(id, name, lastName, email, password, role, birthDate, new Date().toISOString(), active);
            const registerResponse = yield this.user.register(user);
            if (!(registerResponse === null || registerResponse === void 0 ? void 0 : registerResponse.insertedId)) {
                return 2;
            }
            ;
            return {
                message: "Se ha agregado el usuario con éxito",
                user
            };
        });
    }
    getUsers(page = 1, items = 20, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const { users, resultPagination } = yield this.user.getUsers(page, items, {}, active);
            return {
                users: users,
                resultPagination
            };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let loginResponse = yield this.user.login(email);
            if (!loginResponse) {
                return 0;
            }
            else {
                if (loginResponse.active === false) {
                    return 2;
                }
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
    updateUser(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verified = this.jwt.verify(token);
            if (!verified) {
                throw new Error("TOKEN_VENCIDO");
            }
            const exist = yield this.existUser(user.id, "update");
            if (exist === 1 || exist === 0) {
                return exist;
            }
            user.password = (yield this.bcrypt.encryptPass(user.password));
            const userUpdate = new user_model_1.User(user.id, user.name, user.lastName, user.email, user.password, user.role, user.birthDate);
            const updateUserResponse = yield this.user.updateUser(userUpdate);
            if ((updateUserResponse === null || updateUserResponse === void 0 ? void 0 : updateUserResponse.modifiedCount) === 0) {
                return 2;
            }
            else {
                return "Se ha actualizado el usuario";
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
    deleteUser(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verified = this.jwt.verify(token);
            if (!verified) {
                throw new Error("TOKEN_VENCIDO");
            }
            const exist = yield this.existUser(id, "delete");
            if (exist === 1 || exist === 0) {
                return exist;
            }
            const userDeletedResponse = yield this.user.deleteUser(id);
            if ((userDeletedResponse === null || userDeletedResponse === void 0 ? void 0 : userDeletedResponse.deletedCount) === 0) {
                return 2;
            }
            else {
                return "Usuario eliminado con éxito";
            }
        });
    }
    blockUser(id, active, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verified = this.jwt.verify(token);
            if (!verified) {
                throw new Error("TOKEN_VENCIDO");
            }
            const exist = yield this.existUser(id, "delete");
            if (exist === 1 || exist === 0) {
                return exist;
            }
            const blockUserResponse = yield this.user.blockUser(id, active);
            if ((blockUserResponse === null || blockUserResponse === void 0 ? void 0 : blockUserResponse.modifiedCount) === 0) {
                return 2;
            }
            else {
                return "Usuario bloqueado con éxito";
            }
        });
    }
    getSesionToActiveUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let exist = yield this.existUser(id, "update");
            if (exist === 1 || exist === 0) {
                return exist;
            }
            let user = exist[0];
            user.password = "";
            return this.jwt.sign(user);
        });
    }
    activeUser(id, token, password, birthDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const verified = this.jwt.verify(token);
            if (!verified) {
                throw new Error("TOKEN_VENCIDO");
            }
            console.log(verified.user);
            const checkToken = verified.user;
            if (Number(checkToken.id) !== id) {
                return 3;
            }
            let exist = yield this.existUser(id, "update");
            if (exist === 1 || exist === 0) {
                return exist;
            }
            const newPass = yield this.bcrypt.encryptPass(password);
            const activatedUser = yield this.user.activeUser(id, newPass, birthDate);
            if ((activatedUser === null || activatedUser === void 0 ? void 0 : activatedUser.modifiedCount) === 0) {
                return 2;
            }
            return "Se ha activado el usuario";
        });
    }
    resetPass(id, token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const verified = this.jwt.verify(token);
            if (!verified) {
                throw new Error("TOKEN_VENCIDO");
            }
            const checkToken = verified.user;
            console.log({ checkToken });
            console.log({ id });
            if (Number(checkToken.id) !== +id) {
                return 3;
            }
            let exist = yield this.existUser(id, "update");
            if (exist === 1 || exist === 0) {
                return exist;
            }
            const newPass = yield this.bcrypt.encryptPass(password);
            const resetPasswordResponse = yield this.user.resetPassword(id, newPass);
            if ((resetPasswordResponse === null || resetPasswordResponse === void 0 ? void 0 : resetPasswordResponse.modifiedCount) === 0) {
                return 2;
            }
            return "Se ha cambiado la contraseña";
        });
    }
    addCustomerStripeId(customerId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.user.addCustomerStripeId(customerId, id);
        });
    }
    dropCustomerIdProp(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.dropCustomerIdProp(customerId);
        });
    }
}
exports.UserController = UserController;
