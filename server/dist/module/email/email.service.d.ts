import { MailerService } from "@nestjs-modules/mailer";
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail(to: string, subject: string, html: string): Promise<SentMessageInfo>;
}
