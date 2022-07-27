import { UserController } from './../../controllers/users';
import { IResolvers } from "@graphql-tools/utils";
const user = new UserController();

const queryResolvers: IResolvers = {
  Query: {
    users: async (_:void, __: unknown) => {

      try {

        return  {
          status: true,
          message: "",
          users: await user.getUsers()
        }
        
      } catch (error) {
        console.log({error});
        return  {
          status: false,
          message: "Error al cargar la lista de usuarios",
          users: null
        }
      }

    },

    login: async (_:void, args: {
      email:string, password: string
    }) => {

      try {

        const loginResponse = await user.login(args.email,args.password);

        if(loginResponse === 0) {
          return {
            status: false,
            message: "No existe el usuario",
            token: null
          }
        } else if(loginResponse === 1) {
          return {
            status: false,
            message: "Datos de autenticación incorrectos",
            token: null
          }
        } else {

          return {
            status: true,
            message: "Login exitoso",
            token: loginResponse
          }
        }
        
      } catch (error) {
        console.log({error});
        return  {
          status: false,
          message: "Error al intentar hacer login",
          user: null
        }
      }
    }
  },
};

export default queryResolvers;
