import { IResolvers } from "@graphql-tools/utils";

const queryResolvers: IResolvers = {
  Query: {
    users: async (_:void, __: unknown) => {

      try {
        
      } catch (error) {
        console.log({error});
      }

    }
  },
};

export default queryResolvers;
