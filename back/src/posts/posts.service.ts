import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getOnePost(): string {
    return 'get one post';
  }

  getAllPosts(): string {
    return 'get all posts';
  }

  createPost(): string {
    return 'create post';
  }

  updatePost(): string {
    return 'update post';
  }

  updatePartialPost(): string {
    return 'update partial ';
  }

  deletePost(): string {
    return 'delete post';
  }
}
