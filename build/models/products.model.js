"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(_id, id, name, slug, released, img, clip, rating, shortScreenshots) {
        this._id = _id;
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.released = released;
        this.img = img;
        this.clip = clip;
        this.rating = rating;
        this.shortScreenshots = shortScreenshots;
    }
}
exports.Product = Product;
