import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('getAllBlog')
  async getAllBlog() {
    return this.blogService.getAllBlog()
  }

  @Get('getBlogBySlug/:slug')
  async getBlogBySlug(@Param('slug') slug:string) {
    return this.blogService.getBlogBySlug(slug)
  }

}
