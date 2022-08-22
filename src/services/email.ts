import { Transport } from "../config/mailer";
import { IEmail } from "../interface/IEmail";


export class EmailService {

    constructor() {
        
    }

    async sendEmail(obj: IEmail) {
        return await Transport.sendMail(obj);
    }
}
//hacer declaracion