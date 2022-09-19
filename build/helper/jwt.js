"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../config/constant");
class Jwt {
    constructor() {
        this.secret_key = constant_1.SECRET_KEY;
    }
    sign(data, expiresIn = constant_1.EXPRES_IN.H1) {
        delete data.password;
        return jsonwebtoken_1.default.sign({ user: data }, this.secret_key, {
            expiresIn
        });
    }
    verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secret_key);
        }
        catch (error) {
            return false;
        }
    }
}
exports.Jwt = Jwt;
