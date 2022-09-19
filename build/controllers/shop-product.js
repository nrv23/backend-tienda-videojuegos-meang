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
exports.ShopProductController = void 0;
const constant_1 = require("./../config/constant");
const shop_product_1 = require("./../services/shop-product");
class ShopProductController {
    constructor() {
        this.shopProduct = new shop_product_1.ShopProductService();
    }
    getShopProducts(page = 1, itemsPage = 20, active = constant_1.STATE_VALUES_FILTER.ACTIVE, platform_id, randmon) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.shopProduct.getShopProducts(page, itemsPage, active, platform_id, randmon);
            if (!randmon) {
                const { shopProducts, resultPagination } = response;
                return {
                    shopProducts,
                    resultPagination,
                };
            }
            else {
                const { info, shopProducts } = response;
                return {
                    shopProducts,
                    resultPagination: info,
                };
            }
        });
    }
    getProductsOffers(page = 1, itemsPage = 20, active = constant_1.STATE_VALUES_FILTER.ACTIVE, randmon, topPrice = 1, lastUnits = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ lastUnits });
            console.log({ topPrice });
            let filters = {};
            if (lastUnits > 10 && topPrice > 10) {
                console.log("3");
                filters = {
                    $and: [
                        {
                            price: {
                                $lte: topPrice,
                            },
                        },
                        {
                            stock: {
                                $lte: topPrice,
                            },
                        },
                    ],
                };
            }
            else if (lastUnits <= 0 && topPrice > 10) {
                console.log("2");
                filters = {
                    price: {
                        $lte: topPrice,
                    },
                };
            }
            else if (lastUnits > 0 && topPrice <= 10) {
                console.log("1");
                filters = {
                    stock: {
                        $lte: lastUnits,
                        $gte: 1
                    },
                };
            }
            const response = yield this.shopProduct.getShopProducts(page, itemsPage, active, [], randmon, filters);
            if (!randmon) {
                const { shopProducts, resultPagination } = response;
                return {
                    shopProducts,
                    resultPagination,
                };
            }
            else {
                const { info, shopProducts } = response;
                return {
                    shopProducts,
                    resultPagination: info,
                };
            }
        });
    }
}
exports.ShopProductController = ShopProductController;
