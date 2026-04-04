import { Types } from "mongoose";
export interface TemplatesMessage {
    subject: string;
    html: string;
}
export declare const TemplatesMessageModel: import("mongoose").Model<TemplatesMessage, {}, {}, {}, import("mongoose").Document<unknown, {}, TemplatesMessage, {}, import("mongoose").DefaultSchemaOptions> & TemplatesMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TemplatesMessage>;
