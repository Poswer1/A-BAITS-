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
                    user:'apikey',
                    pass: process.env.SENDGRID_API_KEY
                }
            },
            defaults: {
                 from: '"My Project" <no-reply@mydomain.com>',
            }
        })
    ],
    providers: [EmailService],
    exports: [EmailService]
})

export class EmailModule {}