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
exports.CardController = void 0;
const card_1 = require("./../services/card");
class CardController {
    constructor() {
        this.cardService = new card_1.CardService();
    }
    createCardToken(card) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cardService.createCardToken(card);
        });
    }
    addTokenCard(customerId, tokenCard) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cardService.addTokenCard(customerId, tokenCard);
        });
    }
    retrieveSource(customerId, cardToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cardService.retrieveSource(customerId, cardToken);
        });
    }
    updateCard(customerId, cardToken, details) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cardService.updateCard(customerId, cardToken, details);
        });
    }
    deleteCard(customerId, cardToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cardService.deleteCard(customerId, cardToken);
        });
    }
    getCards(customerId, limit, startingAfter = "", endingBefore = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cardService.getCards(customerId, limit, startingAfter, endingBefore);
        });
    }
}
exports.CardController = CardController;
