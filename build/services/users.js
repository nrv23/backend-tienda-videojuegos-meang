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
exports.UserService = void 0;
const constant_1 = require("../config/constant");
const connection_1 = __importDefault(require("../helper/connection"));
class UserService {
    constructor() {
    }
    getLastId() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.USERS).find().limit(1).sort({ registerDate: -1 }).toArray();
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.USERS).insertOne(user);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.USERS).find().sort({ registerDate: -1 }).toArray();
        });
    }
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_1.COLLECTIONS.USERS).findOne({ email });
        });
    }
}
exports.UserService = UserService;
