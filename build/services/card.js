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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = void 0;
const constant_1 = require("./../config/constant");
const stripe_api_1 = __importDefault(require("../lib/stripe-api"));
class CardService {
    constructor() {
        this.stripeApi = new stripe_api_1.default();
    }
    createCardToken(card) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.TOKEN, constant_1.STRIPE_ACTIONS.CREATE, card);
        });
    }
    addTokenCard(customerId, tokenCard) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.CREaTE_SOURCE, customerId, { source: tokenCard });
        });
    }
    retrieveSource(customerId, cardToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.RETRIEVE_SOURCE, customerId, cardToken);
        });
    }
    updateCard(customerId, tokenCard, card) {
        return __awaiter(this, void 0, void 0, function* () {
            let objUpdate = {};
            for (const [key, value] of Object.entries(card)) {
                if (key && value) {
                    objUpdate[key] = value;
                }
            }
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.UPDATE_SOURCE, customerId, tokenCard, objUpdate);
        });
    }
    deleteCard(customerId, tokenCard) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.DELETE_SOURCE, customerId, tokenCard);
        });
    }
    getCards(customerId, limit, startingAfter, endingBefore) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            filter.limit = limit;
            if (startingAfter) {
                filter.starting_after = startingAfter;
            }
            if (endingBefore) {
                filter.ending_before = endingBefore;
            }
            console.log({ filter });
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.LIST_SOURCE, customerId, Object.assign({ object: 'card' }, filter));
        });
    }
}
exports.CardService = CardService;
