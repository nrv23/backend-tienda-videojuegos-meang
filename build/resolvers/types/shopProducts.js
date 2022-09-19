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
const platform_1 = require("./../../controllers/platform");
const product_1 = require("./../../controllers/product");
const product = new product_1.ProductController();
const platfotm = new platform_1.PlatformController();
const typeShopProductResolvers = {
    ShopProduct: {
        platformId: (parent) => parent.platform_id,
        productId: (parent) => parent.product_id,
        product: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield product.getProduct(parent.product_id); }),
        platform: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield platfotm.getPlatform(parent.platform_id.toString()); })
    }
};
exports.default = typeShopProductResolvers;
