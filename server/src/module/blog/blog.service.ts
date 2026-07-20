import { BadRequestException, Injectable } from '@nestjs/common';
import { BlogModel } from 'src/models/blog.model';

@Injectable()
export class BlogService {

    async getAllBlog() {
        const allBlog = await BlogModel.find({})
        .populate('author', 'avatar name')
        return allBlog || []
    }

    async getBlogBySlug(slug:string) {
        const blog = await BlogModel.findOne({slug})
        .populate('author', 'avatar name')
        if(!blog) throw new BadRequestException('BlogNotFound')
        return blog
    }

}
