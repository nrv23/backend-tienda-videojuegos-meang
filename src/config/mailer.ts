import { USER_EMAIL, USER_PASSWORD } from './constant';
import { createTransport } from "nodemailer";

export const Transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // ponerlo en true si el puerto es 465
    auth:{
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
});


Transport.verify().then(() => {
    console.log("Conexion de envio de emails correcto");
})