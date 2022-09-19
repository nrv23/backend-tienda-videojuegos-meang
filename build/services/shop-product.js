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
exports.ShopProductService = void 0;
const constant_1 = require("./../config/constant");
const constant_2 = require("../config/constant");
const connection_1 = __importDefault(require("../helper/connection"));
const query_1 = require("../helper/query");
class ShopProductService {
    constructor() { }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield connection_1.default;
            return (0, query_1.getLastId)(connection, constant_2.COLLECTIONS.SHOP_PRODUCTS);
        });
    }
    getShopProducts(page, itemsPage, active, platform_id, random = false, otherFilters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            if (active === constant_1.STATE_VALUES_FILTER.ACTIVE) {
                filter = {
                    active: {
                        $ne: false,
                    },
                };
            }
            else if (active === constant_1.STATE_VALUES_FILTER.INACTIVE) {
                filter = {
                    active: false,
                };
            }
            else {
                filter = {};
            }
            if (Number(platform_id === null || platform_id === void 0 ? void 0 : platform_id.length) > 0) {
                filter = Object.assign(Object.assign({}, filter), { platform_id: { $in: platform_id } });
            }
            console.log({ otherFilters });
            if (Object.keys(otherFilters).length > 0 && typeof otherFilters !== "undefined") {
                console.log("viene");
                filter = Object.assign(Object.assign({}, filter), otherFilters);
            }
            console.log(filter);
            console.log({ random });
            const connection = yield connection_1.default;
            if (!random) {
                const paginationOptions = yield (0, query_1.pagination)(connection, constant_2.COLLECTIONS.SHOP_PRODUCTS, page, itemsPage, filter);
                const shopProducts = connection === null || connection === void 0 ? void 0 : connection.collection(constant_2.COLLECTIONS.SHOP_PRODUCTS).find(filter).limit(paginationOptions.itemsPage).skip(paginationOptions.skip).sort({ id: 1 }).toArray();
                return {
                    shopProducts: shopProducts,
                    resultPagination: paginationOptions,
                };
            }
            else {
                const result = yield (0, query_1.ramdonItems)(constant_2.COLLECTIONS.SHOP_PRODUCTS, connection, filter, itemsPage);
                if (result.length === 0 || result.length !== itemsPage) {
                    return {
                        info: {
                            page: 1,
                            itemsPage,
                            total: 0,
                            totalPages: 0,
                        },
                        status: false,
                        message: "No se ha podido obtener la información de los productos",
                        shopProducts: [],
                    };
                }
                return {
                    info: {
                        page: 1,
                        itemsPage,
                        total: itemsPage,
                        totalPages: 1,
                    },
                    status: false,
                    message: "Se ha cargado correctamente la informaciín de los productos",
                    shopProducts: result,
                };
            }
        });
    }
}
exports.ShopProductService = ShopProductService;
