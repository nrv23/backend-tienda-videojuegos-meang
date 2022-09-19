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
const cardStripeQueryResolvers = {
    Query: {
        createCardToken: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield card.createCardToken(args);
                return {
                    status: true,
                    message: "",
                    token: response.id,
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                };
            }
        }),
        retrieveCard: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield card.retrieveSource(args.customerId, args.cardToken);
                return !response
                    ? {
                        status: false,
                        message: "No se pudo obtener la información de la tarjeta",
                        dataCard: null,
                    }
                    : {
                        status: true,
                        message: "",
                        dataCard: [response],
                    };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                };
            }
        }),
        listCards: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { data, has_more } = yield card.getCards(args.customerId, args.limit, args.startingAfter, args.endingBefore);
                return {
                    status: true,
                    message: "",
                    hasMore: has_more,
                    dataCard: data
                };
            }
            catch (error) {
                console.log({ error });
                return {
                    status: false,
                    message: "Hubo un error",
                };
            }
        }),
    },
};
exports.default = cardStripeQueryResolvers;
