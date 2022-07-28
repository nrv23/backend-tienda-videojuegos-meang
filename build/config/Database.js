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
const mongodb_1 = require("mongodb");
const chalk_1 = __importDefault(require("chalk"));
const constant_1 = require("./constant");
class Database {
    init() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("================DATABASE================");
            try {
                const MONGODB = constant_1.DATABASE;
                const mongoClient = yield mongodb_1.MongoClient.connect(MONGODB === null || MONGODB === void 0 ? void 0 : MONGODB.toString());
                this.db = mongoClient.db();
                console.log(`STATUS: ${chalk_1.default.greenBright("ONLINE")}`);
                console.log(`DATABASE: ${chalk_1.default.greenBright(this.db.databaseName)}`);
            }
            catch (error) {
                console.log(`ERROR: ${error}`);
                console.log(`STATUS: ${chalk_1.default.redBright("OFFLINE")}`);
                console.log(`DATABASE: ${chalk_1.default.redBright((_a = this.db) === null || _a === void 0 ? void 0 : _a.databaseName)}`);
            }
            return this.db;
        });
    }
}
exports.default = Database;
