"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bcrypt = void 0;
const constant_1 = require("./../config/constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Bcrypt {
    constructor() {
    }
    encryptPass(password) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.genSalt(constant_1.saltRounds, function (err, salt) {
                if (err) {
                    return reject(err);
                }
                bcrypt_1.default.hash(password, salt, function (err, hash) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(hash);
                });
            });
        });
    }
    verifyPassword(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(password, hash, function (err, result) {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
}
exports.Bcrypt = Bcrypt;
