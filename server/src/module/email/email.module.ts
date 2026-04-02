import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";

@Module({
    imports: [
        MailerModule.forRoot({
        transport: {
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'apikey',
                pass: '12LYMBR7L2WHQHY1TM6FUZ4T',
            },
            tls: {
            rejectUnauthorized: false,
            },
        },
        defaults: {
            from: '"My Project" <no-reply@mydomain.com>',
        },
        })
    ],
    providers: [EmailService],
    exports: [EmailService]
})

export class EmailModule {}