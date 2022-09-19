"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typePlatformResolvers = {
    Platform: {
        active: (parent) => typeof parent.active === "undefined"
            || parent.active === null
            ? true
            : parent.active
    }
};
exports.default = typePlatformResolvers;
