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
exports.StripeCustomerController = void 0;
const users_1 = require("./users");
const stripe_1 = require("./../services/stripe");
class StripeCustomerController {
    constructor() {
        this.stripeCustomerService = new stripe_1.StripeCustomerService();
        this.userController = new users_1.UserController();
    }
    getCustomerByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeCustomerService.getCustomerByEmail(email);
        });
    }
    createCustomer(email, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = {
                exists: false,
                data: undefined,
            };
            const { data } = yield this.getCustomerByEmail(email);
            if (data.length > 0) {
                obj.exists = true;
                obj.data = undefined;
                return obj;
            }
            const user = yield this.userController.existUser(email, "update");
            const response = yield this.stripeCustomerService.createCustomer(email, name);
            if (response) {
                obj.exists = false;
                obj.data = [response];
                const updateCustomerId = yield this.userController.addCustomerStripeId(obj.data[0].id, user[0].id);
                if (updateCustomerId.modifiedCount === 0) {
                    console.log("No se actualizó");
                }
                return obj;
            }
            else {
                obj.exists = false;
                obj.data = undefined;
                return obj;
            }
        });
    }
    getCustomers(limit, startingAfter = "", endingBefore = "") {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeCustomerService.getCustomers(limit, startingAfter, endingBefore);
        });
    }
    retrieveCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.stripeCustomerService.getRetrieveCustomerById(id);
            if (!response) {
                return null;
            }
            else {
                return [response];
            }
        });
    }
    updateCustomer(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.stripeCustomerService.updateCustomer(id, obj);
            return !response ? null : [response];
        });
    }
    deleteCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.stripeCustomerService.deleteCustomer(id);
            if (response.deleted) {
                const deleteCustomerIdProp = yield this.userController.dropCustomerIdProp(id);
                if ((deleteCustomerIdProp === null || deleteCustomerIdProp === void 0 ? void 0 : deleteCustomerIdProp.modifiedCount) === 0) {
                    return null;
                }
                else {
                    return response;
                }
            }
            else {
                return null;
            }
        });
    }
}
exports.StripeCustomerController = StripeCustomerController;
