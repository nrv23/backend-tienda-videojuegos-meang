import { IEmail } from './../interface/IEmail';
import { EmailService } from "../services/email";

export class EmailController {

    constructor() {

    }

    private emailService: EmailService = new EmailService();

    public async sendMail(obj: IEmail) {

        return this.emailService.sendEmail(obj)
    }
}