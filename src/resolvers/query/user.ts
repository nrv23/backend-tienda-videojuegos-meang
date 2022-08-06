import { UserController } from './../../controllers/users';
import { IResolvers } from "@graphql-tools/utils";
import { User } from '../../interface/user.interface';

const user = new UserController();

const queryResolvers: IResolvers = {
  Query: {
    users: async (_:void, args: { page: number, items: number }) => {

      try {

        const { users, resultPagination:info } = await user.getUsers(args.page,args.items);

        return  {
          info,
          status: true,
          message: "",
          users 
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
    },
    me: async (_:void, __:unknown, context:{ token: string }) => {

      try {

        const meResponse = await user.getMe(context.token);

        if(typeof meResponse === "string") {
          return {
            status: false,
            message: meResponse
          }
        } else {
          

          const { user } = meResponse as User;
          return {
            status: true,
            message: "",
            users: [user]
          }
        }

        /*
          para hacer un spread operator en un array o en un objeto, se debe aplicar el spread operator 
          para copiar datos de un array dentro de un array y de un objeto dentro de un objeto
          por ejemplo

          const arr = [];
          let arr2= [];
          arr2 = [...arr];
          para objetos seria

          const obj = {};
          let obj2 = {};

          obj2 = {...obj};
        */
        return null
      } catch (error) {
        console.log({error});
      }
    }
  },
};

export default queryResolvers;
