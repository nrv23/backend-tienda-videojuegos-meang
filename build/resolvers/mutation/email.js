"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./../../controllers/users");
const constant_1 = require("../../config/constant");
const email_1 = require("../../controllers/email");
const email = new email_1.EmailController();
const user = new users_1.UserController();
const resolversEmailMutation = {
    Mutation: {
        sendEmail: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { accepted } = yield email.sendMail({
                    from: "navemen23@hotmail.com",
                    to: args.mail.to,
                    subject: args.mail.subject,
                    html: args.mail.html
                });
                if (accepted.length > 0) {
                    return {
                        status: true,
                        message: "Correo enviado",
                        mail: args.mail
                    };
                }
                return {
                    status: false,
                    message: "No se pudo enviar el correo"
                };
            }
            catch (error) {
                return {
                    status: false,
                    message: "Error al enviar el correo"
                };
            }
        }),
        activeUserEmail: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const sessionResponse = yield user.getSesionToActiveUser(args.id);
                if (typeof sessionResponse === "string") {
                    const { accepted } = yield email.sendMail({
                        from: "nrv2391@gmail.com",
                        to: args.email,
                        subject: "Activar usuario",
                        html: `Activa el usuario ${args.email} usando este link <a href="${constant_1.CLIENT_URL}#/active/${sessionResponse}">Click aquí</a> `
                    });
                    if (accepted.length > 0) {
                        return {
                            status: true,
                            message: "Correo enviado",
                            mail: args.email
                        };
                    }
                }
                else if (sessionResponse === 1) {
                    return {
                        status: false,
                        message: "No existe un usuario asignado al id " + args.id
                    };
                }
                else if (sessionResponse === 0) {
                    return {
                        status: false,
                        message: "EL paramétro del correo es requerido"
                    };
                }
            }
            catch (error) {
                return {
                    status: false,
                    message: "Error al enviar el correo de activacion"
                };
            }
        }),
        resetPasswordEmail: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const sessionResponse = yield user.getSesionToActiveUser(args.email);
                if (typeof sessionResponse === "string") {
                    const { accepted } = yield email.sendMail({
                        from: "nrv2391@gmail.com",
                        to: args.email,
                        subject: "Activar usuario",
                        html: `Resetea la contraseña usando este link <a href="${constant_1.CLIENT_URL}#/reset/${sessionResponse}">Click aquí</a> `
                    });
                    if (accepted.length > 0) {
                        return {
                            status: true,
                            message: "Correo enviado",
                            mail: args.email
                        };
                    }
                }
                else if (sessionResponse === 1) {
                    return {
                        status: false,
                        message: "No existe un usuario asignado al email " + args.email
                    };
                }
                else if (sessionResponse === 0) {
                    return {
                        status: false,
                        message: "EL paramétro del correo es requerido"
                    };
                }
            }
            catch (error) {
                return {
                    status: false,
                    message: "Error al enviar el correo de reset de contraseña"
                };
            }
        })
    }
};
exports.default = resolversEmailMutation;
