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
const shop_product_1 = require("./../../controllers/shop-product");
const shopProduct = new shop_product_1.ShopProductController();
const queryResolversShopProducts = {
    Query: {
        showProducts: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { shopProducts, resultPagination } = yield shopProduct.getShopProducts(args.page, args.items, args.active);
                return {
                    status: true,
                    message: "",
                    shopProducts,
                    info: resultPagination,
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: "Hubo un error en el servidor",
                };
            }
        }),
        showProductsPlatforms: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { shopProducts, resultPagination } = yield shopProduct.getShopProducts(args.page, args.items, args.active, args.platform_id, args.random);
                return {
                    status: true,
                    message: "",
                    shopProducts,
                    info: resultPagination,
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: "Hubo un error en el servidor",
                };
            }
        }),
        showProductsOffers: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { shopProducts, resultPagination } = yield shopProduct.getProductsOffers(args.page, args.items, args.active, args.random, args.topPrice, args.lastUnits);
                return {
                    status: true,
                    message: "",
                    shopProducts,
                    info: resultPagination,
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error en el servidor",
                };
            }
        }),
    },
};
exports.default = queryResolversShopProducts;
