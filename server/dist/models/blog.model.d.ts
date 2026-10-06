import { Document, Types } from "mongoose";
export interface Blog {
    images: string;
    title: string;
    descriptions: string;
    author: Types.ObjectId;
}
export declare const BlogModel: import("mongoose").Model<Blog, {}, {}, {}, Document<unknown, {}, Blog, {}, import("mongoose").DefaultSchemaOptions> & Blog & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, Blog>;
