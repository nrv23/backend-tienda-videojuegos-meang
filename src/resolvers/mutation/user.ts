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
          
            return {
              status: false,
              message: "No se pudo agregar el usuario"
            }
          }

          else if(registerResponse === "existe") {
            return {
              status: false,
              message: "No puede registrar un usuario que ya existe anteriormente"
            }

          }

          return  {
            status: true,
            message: "Usuario registrado con éxito"
          }
;

        } catch (error) {
          console.log({ error });

          return {
            status: false,
            message: "Error al registrar el usuario"
          };
        }
      } catch (error) {
        console.log({ error });
      }
    },
  },
};

export default mutationResolvers;
