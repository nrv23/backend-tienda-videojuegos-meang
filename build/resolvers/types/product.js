"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeProductResolvers = {
    Product: {
        img: (parent) => !parent.img ? "" : parent.img,
        released: (parent) => !parent.released ? "" : parent.released,
        clip: (parent) => !parent.clip ? {} : parent.clip,
    }
};
exports.default = typeProductResolvers;
