import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    getAllBlog(): Promise<(import("mongoose").Document<unknown, {}, import("../../models/blog.model").Blog, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/blog.model").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getBlogBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("../../models/blog.model").Blog, {}, import("mongoose").DefaultSchemaOptions> & import("../../models/blog.model").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
