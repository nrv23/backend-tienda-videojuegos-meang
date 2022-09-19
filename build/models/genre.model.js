"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
class Genre {
    constructor(name, slug, id, active) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.active = active;
    }
}
exports.Genre = Genre;
