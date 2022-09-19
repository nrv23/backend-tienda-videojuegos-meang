"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopProduct = void 0;
class ShopProduct {
    constructor(id, product_id, platform_id, active, price, stock, _id, product, platform) {
        this.id = id;
        this.product_id = product_id;
        this.platform_id = platform_id;
        this.active = active;
        this.price = price;
        this.stock = stock;
        this._id = _id;
        this.product = product;
        this.platform = platform;
    }
}
exports.ShopProduct = ShopProduct;
