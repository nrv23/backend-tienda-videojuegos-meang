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
const constant_1 = require("./../config/constant");
const constant_2 = require("../config/constant");
const connection_1 = __importDefault(require("../helper/connection"));
const query_1 = require("../helper/query");
class UserService {
    constructor() {
    }
    getLastId() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return (0, query_1.getLastId)(connection, constant_2.COLLECTIONS.USERS);
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).insertOne(user);
        });
    }
    getUsers(page, items, filter = {}, active = constant_1.STATE_VALUES_FILTER.ACTIVE) {
        return __awaiter(this, void 0, void 0, function* () {
            if (active === constant_1.STATE_VALUES_FILTER.ACTIVE) {
                filter = {
                    active: {
                        $ne: false
                    }
                };
            }
            else if (active === constant_1.STATE_VALUES_FILTER.INACTIVE) {
                filter = {
                    active: false
                };
            }
            else {
                filter = {};
            }
            const connection = yield connection_1.default;
            const paginationOptions = yield (0, query_1.pagination)(connection, constant_2.COLLECTIONS.USERS, page, items, filter);
            const users = connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).find(filter).limit(paginationOptions.itemsPage).skip(paginationOptions.skip).sort({ id: 1 }).toArray();
            return {
                users,
                resultPagination: paginationOptions
            };
        });
    }
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).findOne({ email });
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).updateOne({ id: Number(user.id) }, {
                $set: {
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    birthDate: user.birthDate
                }
            });
        });
    }
    addCustomerStripeId(customerId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).updateOne({ id: Number(id) }, {
                $set: {
                    customerId
                }
            });
        });
    }
    existUser(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).find({ $or: [{ email: String(value) }, { id: Number(value) }] }).toArray();
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).deleteOne({ id: Number(id) });
        });
    }
    blockUser(id, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).updateOne({ id: Number(id) }, {
                $set: {
                    active: Boolean(active)
                }
            });
        });
    }
    activeUser(id, password, birthDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).updateOne({ id: Number(id) }, {
                $set: {
                    active: true,
                    birthDate,
                    password
                }
            });
        });
    }
    resetPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).updateOne({ id: Number(id) }, {
                $set: {
                    password
                }
            });
        });
    }
    dropCustomerIdProp(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.USERS).updateOne({ customerId: String(customerId) }, {
                $unset: {
                    customerId
                }
            });
        });
    }
}
exports.UserService = UserService;
