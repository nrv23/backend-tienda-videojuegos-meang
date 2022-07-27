import { IResolvers } from "@graphql-tools/utils";
import { UserController } from "../../controllers/users";
import { User } from "../../interface/user.interface";
const user = new UserController();

const mutationResolvers: IResolvers = {
  Mutation: {
    register: async (_: void, args: User) => {
      try {
        try {
          const { name, lastName, email, password, role, birthDate } =
            args.user;

          const registerResponse = await user.register(
            name,
            lastName,
            email,
            password,
            role,
            birthDate
          );

          if (!registerResponse) {
            return "No se pudo agregar el usuario";
          }

          else if(registerResponse === "existe") {
            return "No puede registrar un usuario que ya existe anteriormente";
          }

          return "Usuario agregado con éxito";

        } catch (error) {
          console.log({ error });

          return "Error al agregar el usuario";
        }
      } catch (error) {
        console.log({ error });
      }
    },
  },
};

export default mutationResolvers;
