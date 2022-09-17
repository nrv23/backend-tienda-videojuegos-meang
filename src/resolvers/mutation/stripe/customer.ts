import { StripeCustomerController } from "./../../../controllers/stripe";
import { IResolvers } from "@graphql-tools/utils";
const stripe = new StripeCustomerController();

const customerStripeMutationResolvers: IResolvers = {
  Mutation: {
    createCustomer: async (
      _: void,
      args: { email: string; name: string },
      context: {}
    ) => {
      try {
        const customerResponse = await stripe.createCustomer(
          args.email,
          args.name
        );

        if (customerResponse.exists && !customerResponse.data) {
          return {
            status: false,
            message: "El cliente fue registrado anteriormente",
            customers: customerResponse.data,
          };
        }

        if (!customerResponse.exists && !customerResponse.data) {
          // agregó el cliente en stripe
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
      } catch (error) {
        console.log({ error });
        return {
          status: false,
          message: "Hubo un error",
          customers: null,
        };
      }
    },
    updateCustomer: async (
      _: void,
      args: {
        id?: string;
        name?: string;
        description?: string;
        email?: string;
        phone?: string;
      },
      context: {}
    ) => {
      try {
        const response = await stripe.updateCustomer(args.id!, args);

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
      } catch (error) {
        console.log({ error });
        return {
          status: false,
          message: "Hubo un error",
          customers: null,
        };
      }
    },
    deleteCustomer: async (_: void, args: { id: string }, context: {}) => {
      try {

        return await stripe.deleteCustomer(args.id)
          ? {
              status: true,
              message: "Se ha eliminado correctamente",
            }
          : {
              status: false,
              message: "No se pudo eliminar el cliente",
            };
      } catch (error) {
        console.log({ error });
        return {
          status: false,
          message: "Hubo un error",
          customers: null,
        };
      }
    },
  },
};

export default customerStripeMutationResolvers;
