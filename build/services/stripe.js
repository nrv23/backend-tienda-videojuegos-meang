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
exports.StripeCustomerService = void 0;
const constant_1 = require("./../config/constant");
const stripe_api_1 = __importDefault(require("../lib/stripe-api"));
class StripeCustomerService {
    constructor() {
        this.stripeApi = new stripe_api_1.default();
    }
    createCustomer(email, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.CREATE, {
                email,
                name,
                description: name.concat(" ", `(${email})`),
            });
        });
    }
    getCustomers(limit, startingAfter, endingBefore) {
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
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.LIST, filter);
        });
    }
    getCustomerByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.LIST, { email });
        });
    }
    getRetrieveCustomerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.RETRIEVE, id);
        });
    }
    updateCustomer(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let objUpdate = {};
            for (const [key, value] of Object.entries(obj.customer)) {
                if (key && value) {
                    objUpdate[key] = value;
                }
            }
            delete objUpdate.id;
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.UPDATE, id, Object.assign({}, objUpdate));
        });
    }
    deleteCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeApi.execute(constant_1.STRIPE_OBJECTS.CUSTOMERS, constant_1.STRIPE_ACTIONS.DELETE, id);
        });
    }
}
exports.StripeCustomerService = StripeCustomerService;
