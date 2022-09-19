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
const card_1 = require("./../../../controllers/card");
const card = new card_1.CardController();
const mutationCardStripeResolvers = {
    Mutation: {
        createCard: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield card.addTokenCard(args.customerId, args.tokenCard);
                console.log(response);
                if (!response.id) {
                    return {
                        status: false,
                        message: "No se pudo configurar el cliente con la información de la tarjeta",
                        card: null
                    };
                }
                else {
                    return {
                        status: true,
                        message: "Se ha asociado correctamente al cliente con la tarjeta",
                        dataCard: [response]
                    };
                }
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error"
                };
            }
        }),
        updateCard: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield card.updateCard(args.customerId, args.tokenCard, args.details);
                if (!response.id) {
                    return {
                        status: false,
                        message: "No se pudo actualizar  la información de la tarjeta",
                        dataCard: null
                    };
                }
                else {
                    return {
                        status: true,
                        message: "Se ha actualizado correctamente la informaciób de la tarjeta",
                        dataCard: [response]
                    };
                }
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error"
                };
            }
        }),
        deleteCard: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield card.deleteCard(args.customerId, args.tokenCard);
                if (!response.deleted) {
                    return {
                        status: false,
                        message: "No se pudo eliminar la tarjeta",
                    };
                }
                else {
                    return {
                        status: true,
                        message: "Se ha eliminado la tarjeta"
                    };
                }
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error"
                };
            }
        })
    }
};
exports.default = mutationCardStripeResolvers;
