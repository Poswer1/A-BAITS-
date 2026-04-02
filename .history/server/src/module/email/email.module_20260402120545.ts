import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";

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
            
        })
    ]
})