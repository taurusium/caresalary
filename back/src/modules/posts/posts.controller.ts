import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from 'src/common/entities/decorators/user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':postId')
  getOnePost(@Param('postId') postId: string) {
    return this.postService.getOnePost(postId);
  }

  @Post()
  @UseGuards(AuthGuard)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: CreateUserDto,
  ) {
    createPostDto.userId = user.userId;
    return this.postService.createPost(createPostDto);
  }

  @Put(':postId')
  updatePost(@Param('postId') postId: string, createPostDto: CreatePostDto) {
    return this.postService.updatePost(postId, createPostDto);
  }

  @Patch(':postId')
  updatePartialPost(
    @Param('postId') postId: string,
    createPostDto: CreatePostDto,
  ) {
    return this.postService.updatePartialPost(postId, createPostDto);
  }

  @Delete(':postId')
  deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
