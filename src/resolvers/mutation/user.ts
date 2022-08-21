import { User } from './../../models/user.model';
import { IResolvers } from "@graphql-tools/utils";
import { UserController } from "../../controllers/users";
import { User as IUser } from "../../interface/user.interface";
const user = new UserController();

const mutationResolvers: IResolvers = {
  Mutation: {
    register: async (_: void, args: IUser) => {
        try {
          const { name, lastName, email, password, role, birthDate } =
            args.user;

          const registerResponse = await user.register(
            name,
            lastName,
            email,
            password,
            role,
            birthDate,
            args.user.active !== null && typeof args.user.active !== 'undefined' ? args.user.active: true
          );

          if (registerResponse === 0) {
          
            return {
              status: false,
              message: "No se pudo validar el usuario"
            }
          }

          else if(registerResponse === 1) {
            return {
              status: false,
              message: "No puede registrar un usuario que ya existe anteriormente"
            }

          } else if(registerResponse === 2) {
            return {
              status: false,
              message: "No pudo registrar el usuario"
            }
          }

          return  {
            status: true,
            message: registerResponse
          }
;

        } catch (error) {
          console.log({ error });

          return {
            status: false,
            message: "Error al registrar el usuario"
          };
        }
    },

    updateUser: async(_:void, args: {user: User},context: {token: string}) => {
      try {

        console.log({user: args.user});
       
        
        const updatedResponse = await user.updateUser(args.user,context.token);

        if (updatedResponse === 0) {
        
          return {
            status: false,
            message: "No se pudo validar el usuario"
          }
        }

        else if(updatedResponse === 1) {
          return {
            status: false,
            message: "No puede actualizar un usuario que no existe"
          }

        } else if(updatedResponse === 2) {
          return {
            status: false,
            message: "No se pudo actualizar el usuario"
          }
        }

        return  {
          status: true,
          message: updatedResponse
        };

      } catch (error) {
        console.log(error);

        const errorResponse = error as Error;
        if(errorResponse.message === "TOKEN_VENCIDO") {

          return {
            status: false,
            message: "Se ha vencido la sesión"
          };
        } 

        return {
          status: false,
          message: "Error al actualizar el usuario"
        };
        
      }
    },

    deleteUser: async(_: void, args:{ id: number }, context: { token: string }) => {

      try {
        
        
        const deletedResponse = await user.deleteUser(args.id,context.token);

        if (deletedResponse === 0) {
        
          return {
            status: false,
            message: "No se pudo validar el usuario"
          }
        }

        else if(deletedResponse === 1) {
          return {
            status: false,
            message: "No puede eliminar un usuario que no existe"
          }

        } else if(deletedResponse === 2) {
          return {
            status: false,
            message: "No se pudo eliminar el usuario"
          }
        }

        return  {
          status: true,
          message: deletedResponse
        };
        

      } catch (error) {
        console.log(error);

        const errorResponse = error as Error;
        if(errorResponse.message === "TOKEN_VENCIDO") {

          return {
            status: false,
            message: "Se ha vencido la sesión"
          };
        } 

        return {
          status: false,
          message: "Error al eliminar el usuario"
        };
        
      }
    },

    blockUser: async(_:void, args:{ id: number, active: boolean }, context: {token: string}) => {

      try {

        const { id,active } = args;
        const { token } = context;



        const blockUserResponse = await user.blockUser(id,active,token);

        if (blockUserResponse === 0) {
        
          return {
            status: false,
            message: "No se pudo validar el usuario"
          }
        }

        else if(blockUserResponse === 1) {
          return {
            status: false,
            message: "No puede bloquear un usuario que no existe"
          }

        } else if(blockUserResponse === 2) {
          return {
            status: false,
            message: "No se pudo bloquear el usuario"
          }
        }

        return  {
          status: true,
          message: blockUserResponse
        };
        
      } catch (error) {
        console.log(error);

        const errorResponse = error as Error;
        if(errorResponse.message === "TOKEN_VENCIDO") {

          return {
            status: false,
            message: "Se ha vencido la sesión"
          };
        } 

        return {
          status: false,
          message: "Error al bloquear el usuario"
        };
        
      }
    },
    activeUser: async(_:void, args:{ id: string, birthDate: string, password: string }, context: {token: string}) => {

      try {

        const response = await user.activeUser(+args.id,context.token,args.password,args.birthDate)

        if(response === 0) {
          return {
            status: false,
            message: "Debe enviar un id de usuario válido"
          };
        } else if(response === 1) {
            return {
              status: false,
              message: "No existe el usuario con el id"+args.id
            };
          } else if(response === 2) {
            return {
              status: false,
              message: "No se pudo activar el usuario"
            };
          }  else if(response === 3) {
            return {
              status: false,
              message: "El parámetro id del usuario no corresponde con el id de la sesión"
            };
          }   else {
            return {
              status: true,
              message: response
            };
          }
  
      } catch (error) {
        console.log(error);

        const errorResponse = error as Error;
        if(errorResponse.message === "TOKEN_VENCIDO") {

          return {
            status: false,
            message: "Se ha vencido la sesión"
          };
        } 

        return {
          status: false,
          message: "Error al activar el usuario"
        };
      }
    },
    resetPassword: async(_:void, args:{id: number, password: string}, context: { token: string }) => {

      try {

        const response = await user.resetPass(args.id,context.token,args.password)

        if(response === 0) {
          return {
            status: false,
            message: "Debe enviar un id de usuario válido"
          };
        } else if(response === 1) {
            return {
              status: false,
              message: "No existe el usuario con el id"+args.id
            };
          } else if(response === 2) {
            return {
              status: false,
              message: "No se pudo cambiar la contraseña del usuario"
            };
          }  else if(response === 3) {
            return {
              status: false,
              message: "El parámetro id del usuario no corresponde con el id de la sesión"
            };
          } else {

            return {
              status: true,
              message: response
            };
          }
        
      } catch (error) {
        console.log(error);

        const errorResponse = error as Error;
        if(errorResponse.message === "TOKEN_VENCIDO") {

          return {
            status: false,
            message: "Se ha vencido la sesión"
          };
        } 

        return {
          status: false,
          message: "Error al actualizar el usuario"
        };
      }
    }
  },
};

export default mutationResolvers;
