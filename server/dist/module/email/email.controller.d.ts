import { EmailService } from "./email.service";
import { SendMessageDto } from "./email.dto";
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(dto: SendMessageDto): Promise<import("resend").CreateEmailResponse>;
    comparisonCode(code: string): Promise<{
        success: boolean;
    }>;
    sendCode(email: string): Promise<{
        success: boolean;
    }>;
    newTemplate(subject: string, html: string): Promise<{
        success: boolean;
    }>;
    Newsletter(subject: string, html: string): Promise<{
        success: boolean;
    }>;
    getAllTemplate(): Promise<(import("mongoose").Document<unknown, {}, import("../../models/templatesMessage").TemplatesMessage, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/templatesMessage").TemplatesMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getTemplateById(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../models/templatesMessage").TemplatesMessage, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/templatesMessage").TemplatesMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
