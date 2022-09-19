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
const customerStripeMutationResolvers = {
    Mutation: {
        createCustomer: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const customerResponse = yield stripe.createCustomer(args.email, args.name);
                if (customerResponse.exists && !customerResponse.data) {
                    return {
                        status: false,
                        message: "El cliente fue registrado anteriormente",
                        customers: customerResponse.data,
                    };
                }
                if (!customerResponse.exists && !customerResponse.data) {
                    return {
                        status: false,
                        message: "No se pudo agregar el cliente",
                        customers: customerResponse.data,
                    };
                }
                return {
                    status: true,
                    message: "Se ha agregado el cliente",
                    customers: customerResponse.data,
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                    customers: null,
                };
            }
        }),
        updateCustomer: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield stripe.updateCustomer(args.id, args);
                if (!response) {
                    return {
                        status: false,
                        message: "No se pudo actualizar el cliente",
                        customers: response,
                    };
                }
                return {
                    status: true,
                    message: "Se ha actualizado el cliente",
                    customers: response,
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                    customers: null,
                };
            }
        }),
        deleteCustomer: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return (yield stripe.deleteCustomer(args.id))
                    ? {
                        status: true,
                        message: "Se ha eliminado correctamente",
                    }
                    : {
                        status: false,
                        message: "No se pudo eliminar el cliente",
                    };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                    customers: null,
                };
            }
        }),
    },
};
exports.default = customerStripeMutationResolvers;
