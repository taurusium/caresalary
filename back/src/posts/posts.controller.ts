import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getOnePost() {
    return this.postService.getOnePost();
  }

  @Post()
  createPost() {
    return this.postService.createPost();
  }

  @Put(':id')
  updatePost() {
    return this.postService.updatePost();
  }

  @Patch(':id')
  updatePartialPost() {
    return this.postService.updatePartialPost();
  }

  @Delete(':id')
  deletePost() {
    return this.postService.deletePost();
  }
}
