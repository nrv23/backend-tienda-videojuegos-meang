"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saltRounds = exports.EXPRES_IN = exports.COLLECTIONS = exports.DATABASE = exports.SECRET_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config({ path: "./src/.env" });
}
const DBNAME = process.env.DB_NAME;
const DBURL = process.env.DB_URL;
exports.SECRET_KEY = process.env.SECRET;
exports.DATABASE = `${DBURL}${DBNAME}`;
var COLLECTIONS;
(function (COLLECTIONS) {
    COLLECTIONS["USERS"] = "users";
})(COLLECTIONS = exports.COLLECTIONS || (exports.COLLECTIONS = {}));
var EXPRES_IN;
(function (EXPRES_IN) {
    EXPRES_IN[EXPRES_IN["H1"] = 3600] = "H1";
    EXPRES_IN[EXPRES_IN["h24"] = 86400] = "h24";
    EXPRES_IN[EXPRES_IN["M15"] = 900] = "M15";
})(EXPRES_IN = exports.EXPRES_IN || (exports.EXPRES_IN = {}));
exports.saltRounds = 10;
