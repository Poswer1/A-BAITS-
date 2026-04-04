
import { BadRequestException, Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { TemplatesMessageModel } from "src/models/templatesMessage";
import { UserModel } from "src/models/user.model";

@Injectable()
export class EmailService {
    // private resend = new Resend('re_KM6fi1ap_JHxSaNSfZVsF35yBnpX7fvhF')

    async sendEmail(to: string, subject: string, html: string) {
        return this.resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html
        })
    }

    async Newsletter (subject:string, html:string) {
        const allUser = await UserModel.find({})
        for(const user of allUser) {
           await this.sendEmail(user.email, subject, html)
        }
        return { success: true }
    }

    async newTemplate(subject:string, html:string) {
        try {
            const newTemplate = await TemplatesMessageModel.create({subject,html})   
            return {success:true}
        } catch (error) {
            throw new BadRequestException('ErrorCreateTemplate')
        }
    }

    async getAllTemplate() {
        const allTemplate = await TemplatesMessageModel.find({})
        return allTemplate || []
    }

    async getTemplateById(id:string) {
        const template = await TemplatesMessageModel.findById(id)
        if(!template) throw new BadRequestException('TemplateNotFound')
        return template
    }

}