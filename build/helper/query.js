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
exports.ramdonItems = exports.pagination = exports.countElements = exports.getLastId = void 0;
function getLastId(db, collection) {
    return db.collection(collection).find().sort({ id: -1 }).limit(1).toArray();
}
exports.getLastId = getLastId;
function countElements(collection, db, filter = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.collection(collection).countDocuments(filter);
    });
}
exports.countElements = countElements;
function pagination(db, collection, page = 1, itemsPage = 20, filter = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (itemsPage > 20 || itemsPage < 1) {
            itemsPage = 20;
        }
        if (page < 1) {
            page = 1;
        }
        const total = yield countElements(collection, db, filter);
        const totalPages = Math.ceil(total / itemsPage);
        return {
            page,
            skip: (page - 1) * itemsPage,
            itemsPage,
            total,
            totalPages
        };
    });
}
exports.pagination = pagination;
function ramdonItems(collection, db, filter = {}, items = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        const pipeline = [
            {
                $match: filter
            }, {
                $sample: { size: items }
            }
        ];
        return Promise.resolve(yield db.collection(collection).aggregate(pipeline).toArray());
    });
}
exports.ramdonItems = ramdonItems;
