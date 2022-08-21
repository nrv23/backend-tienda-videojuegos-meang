import { UserController } from './../../controllers/users';
import { IResolvers } from '@graphql-tools/utils';
import { Transport } from '../../config/mailer';
import { IEmail } from '../../interface/IEmail';
import { CLIENT_URL } from '../../config/constant';

const user = new UserController();

const resolversEmailMutation: IResolvers = {

    Mutation: {

        sendEmail: async (_:void, args: {mail: IEmail} ) => {
            
            try {
                
                const {accepted} = await Transport.sendMail({
                    from:"navemen23@hotmail.com",
                    to: args.mail.to,
                    subject: args.mail.subject,
                   // text: "Prueba de correo",
                    html: args.mail.html
                });

                if(accepted.length > 0) {

                    return {
                        status: true,
                        message: "Correo enviado",
                        mail: args.mail
                    }
                }

                return {
                    status: false,
                    message: "No se pudo enviar el correo"
                }

            } catch (error) {

                return {
                    status: false,
                    message: "Error al enviar el correo"
                }

            }

        },
        activeUserEmail: async(_:void , args: {id: number, email: string}) => {

            try {
    
                const sessionResponse = await user.getSesionToActiveUser(args.id);
    
                if(typeof sessionResponse === "string") {
                    const {accepted} = await Transport.sendMail({
                        from:"nrv2391@gmail.com",
                        to: args.email,
                        subject: "Activar usuario",
                       // text: "Prueba de correo",
                        html: `Activa el usuario ${args.email} usando este link <a href="${CLIENT_URL}/${sessionResponse}">Click aquí</a> `
                    });
    
                    if(accepted.length > 0) {
    
                        return {
                            status: true,
                            message: "Correo enviado",
                            mail: args.email
                        }
                    }
                } else if (sessionResponse === 1) {
                    return {
                        status: false,
                        message: "No existe un usuario asignado al id "+args.id
                    }
                }else if (sessionResponse === 0) {
                    return {
                        status: false,
                        message: "EL paramétro del correo es requerido"
                    }
                }
                
            } catch (error) {
                return {
                    status: false,
                    message: "Error al enviar el correo de activacion"
                }
            }
        }
    }
}

    

export default resolversEmailMutation;