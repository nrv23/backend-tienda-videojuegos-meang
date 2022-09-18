import { ICardRequest } from "./../../../interface/ICardRequest";
import { CardController } from "./../../../controllers/card";
import { IResolvers } from "@graphql-tools/utils";

const card = new CardController();

const cardStripeQueryResolvers: IResolvers = {
  Query: {
    createCardToken: async (_: void, args: ICardRequest, context: {}) => {
      try {
        const response = await card.createCardToken(args);

        return {
          status: true,
          message: "",
          token: response.id,
        };
      } catch (error) {
        console.log({ error });
        return {
          status: false,
          message: "Hubo un error",
        };
      }
    },
    retrieveCard: async (
      _: void,
      args: { customerId: string; cardToken: string }
    ) => {
      try {
        const response = await card.retrieveSource(
          args.customerId,
          args.cardToken
        );

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
      } catch (error) {
        console.log({ error });
        return {
          status: false,
          message: "Hubo un error",
        };
      }
    },
    listCards: async (
      _: void,
      args: {
        customerId: string,
        limit: number;
        startingAfter: string;
        endingBefore: string;
      }
    ) => {
      try {

        const {data, has_more} = await card.getCards(args.customerId,args.limit, args.startingAfter, args.endingBefore);

        return {
            status: true,
            message: "",
            hasMore: has_more,
            dataCard: data
        }

      } catch (error) {
        console.log({ error });
        return {
          status: false,
          message: "Hubo un error",
        };
      }
    },
  },
};

export default cardStripeQueryResolvers;
