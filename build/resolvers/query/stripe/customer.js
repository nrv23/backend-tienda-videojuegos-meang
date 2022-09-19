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
const stripe_1 = require("./../../../controllers/stripe");
const stripe = new stripe_1.StripeCustomerController();
const queryStripeCustomersResolvers = {
    Query: {
        customers: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data, has_more } = yield stripe.getCustomers(args.limit, args.startingAfter, args.endingBefore);
                return {
                    status: true,
                    message: "",
                    customers: data,
                    hasMore: has_more,
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: "No se pudieron obtener los clientes",
                    customers: null,
                    hasMore: false,
                };
            }
        }),
        customer: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield stripe.retrieveCustomer(args.id);
                console.log(response);
                return {
                    status: true,
                    message: "",
                    customers: response,
                    hasMore: false,
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: "No se pudieron obtener los clientes",
                    customers: null,
                    hasMore: false,
                };
            }
        }),
    },
};
exports.default = queryStripeCustomersResolvers;
