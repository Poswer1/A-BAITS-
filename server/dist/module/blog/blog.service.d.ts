export declare class BlogService {
    getAllBlog(): Promise<(import("mongoose").Document<unknown, {}, import("src/models/blog.model").Blog, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/blog.model").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getBlogBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("src/models/blog.model").Blog, {}, import("mongoose").DefaultSchemaOptions> & import("src/models/blog.model").Blog & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
