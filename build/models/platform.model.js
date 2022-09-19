"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
class Platform {
    constructor(_id, id, name, slug, active) {
        this._id = _id;
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.active = active;
    }
}
exports.Platform = Platform;
