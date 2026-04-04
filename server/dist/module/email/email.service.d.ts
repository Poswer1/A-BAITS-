export declare class EmailService {
    sendEmail(to: string, subject: string, html: string): Promise<any>;
    Newsletter(subject: string, html: string): Promise<{
        success: boolean;
    }>;
    newTemplate(subject: string, html: string): Promise<{
        success: boolean;
    }>;
    getAllTemplate(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/templatesMessage").TemplatesMessage, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/templatesMessage").TemplatesMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getTemplateById(id: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/templatesMessage").TemplatesMessage, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/templatesMessage").TemplatesMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
