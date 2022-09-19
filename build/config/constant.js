"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE_ACTIONS = exports.STRIPE_OBJECTS = exports.STATE_VALUES_FILTER = exports.CLIENT_URL = exports.USER_PASSWORD = exports.USER_EMAIL = exports.saltRounds = exports.EXPRES_IN = exports.COLLECTIONS = exports.DATABASE = exports.SECRET_KEY = void 0;
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
    COLLECTIONS["GENRES"] = "genres";
    COLLECTIONS["SHOP_PRODUCTS"] = "products_platforms";
    COLLECTIONS["PRODUCTS"] = "products";
    COLLECTIONS["PLATFORMS"] = "platforms";
})(COLLECTIONS = exports.COLLECTIONS || (exports.COLLECTIONS = {}));
var EXPRES_IN;
(function (EXPRES_IN) {
    EXPRES_IN[EXPRES_IN["H1"] = 3600] = "H1";
    EXPRES_IN[EXPRES_IN["h24"] = 86400] = "h24";
    EXPRES_IN[EXPRES_IN["M15"] = 900] = "M15";
})(EXPRES_IN = exports.EXPRES_IN || (exports.EXPRES_IN = {}));
exports.saltRounds = 10;
exports.USER_EMAIL = process.env.USER_EMAIL;
exports.USER_PASSWORD = process.env.USER_PASSWORD;
exports.CLIENT_URL = process.env.CLIENT_URL;
var STATE_VALUES_FILTER;
(function (STATE_VALUES_FILTER) {
    STATE_VALUES_FILTER["ACTIVE"] = "ACTIVE";
    STATE_VALUES_FILTER["ALL"] = "ALL";
    STATE_VALUES_FILTER["INACTIVE"] = "INACTIVE";
})(STATE_VALUES_FILTER = exports.STATE_VALUES_FILTER || (exports.STATE_VALUES_FILTER = {}));
exports.STRIPE_OBJECTS = {
    CUSTOMERS: "customers",
    TOKEN: "tokens"
};
exports.STRIPE_ACTIONS = {
    CREATE: "create",
    LIST: "list",
    SEARCH: "search",
    RETRIEVE: "retrieve",
    UPDATE: "update",
    DELETE: "del",
    CREaTE_SOURCE: "createSource",
    RETRIEVE_SOURCE: "retrieveSource",
    UPDATE_SOURCE: "updateSource",
    DELETE_SOURCE: "deleteSource",
    LIST_SOURCE: "listSources"
};
