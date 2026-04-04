import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { EmailService } from "./email.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth-guard";
import { RolesGuard } from "../admin/role.guards";
import { SendMessageDto } from "./email.dto";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {

    constructor(private readonly emailService:EmailService) {}

    @Post('sendEmail')
    async sendEmail(@Body() dto: SendMessageDto) {
        const {to, subject, html} = dto
        return this.emailService.sendEmail(to, subject, html)
    }

    @Post('newTemplate')
    async newTemplate(@Body('subject') subject:string, @Body('html') html:string) {
        return this.emailService.newTemplate(subject,html)
    }

    @Post('Newsletter')
    async Newsletter(@Body('subject') subject:string, @Body('html') html:string) {
        return this.emailService.Newsletter(subject, html)
    }

    @Get('getAllTemplate')
    async getAllTemplate() {
        return this.emailService.getAllTemplate()
    }

    @Get('getTemplateById/:id')
    async getTemplateById(@Param('id') id:string) {
        return this.emailService.getTemplateById(id)
    }
}