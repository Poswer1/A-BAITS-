import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { EmailService } from "./email.service";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth-guard";
import { RolesGuard } from "../admin/role.guards";
import { SendMessageDto } from "./email.dto";

@Controller('email')
export class EmailController {

    constructor(private readonly emailService:EmailService) {}

    @Post('sendEmail')
    async sendEmail(@Body() dto: SendMessageDto) {
        const {to, subject, html} = dto
        return this.emailService.sendEmail(to, subject, html)
    }

    @Post('comparisonCode')
    async comparisonCode(@Body('code') code:string) {
        return this.emailService.comparisonCode(code)
    }

    @Post('sendCode')
    async sendCode(@Body('email') email:string, @Body('type') type:string) {
        return this.emailService.sendCode(email, type)
    }

    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('newTemplate')
    async newTemplate(@Body('subject') subject:string, @Body('html') html:string) {
        return this.emailService.newTemplate(subject,html)
    }

    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('Newsletter')
    async Newsletter(@Body('subject') subject:string, @Body('html') html:string) {
        return this.emailService.Newsletter(subject, html)
    }

    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get('getAllTemplate')
    async getAllTemplate() {
        return this.emailService.getAllTemplate()
    }

    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Get('getTemplateById/:id')
    async getTemplateById(@Param('id') id:string) {
        return this.emailService.getTemplateById(id)
    }
}