"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
const constant_1 = require("./constant");
const nodemailer_1 = require("nodemailer");
exports.Transport = (0, nodemailer_1.createTransport)({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: constant_1.USER_EMAIL,
        pass: constant_1.USER_PASSWORD
    }
});
exports.Transport.verify().then(() => {
    console.log("Conexion de envio de emails correcto");
});
