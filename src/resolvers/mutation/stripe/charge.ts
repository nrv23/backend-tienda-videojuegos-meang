import { ChargeController } from "./../../../controllers/charge";
import { IResolvers } from "@graphql-tools/utils";

const charge = new ChargeController();

const mutationChargesResolvers: IResolvers = {
  Mutation: {
    createCharge: async (
      _: void,
      args: {
        payment: {
          source: string;
          amount: string;
          description: string;
          customer: string;
          currency?: string;
          token?: string;
        };
      },
      context: {}
    ) => {
      const {
        payment: { source, amount, description, customer, currency,token },
      } = args;

      try {
        const response = await charge.createChage(
          source,
          amount,
          description,
          customer,
          currency,
          token
        );
            console.log({response});
            
        return response 
                && (response[0].paid 
                && response[0].status === "succeeded")
            ? {

                status: true,
                message: "El pago se ha procesado correctamente",
                charge: response
            }:{
                status: false,
                message: "No se pudo procesar el pago"
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

export default mutationChargesResolvers;
