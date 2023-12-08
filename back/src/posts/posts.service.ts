import { Firestore } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(
    @Inject('FirestoreInstance') private readonly firestore: Firestore,
  ) {}
  getOnePost(): string {
    return 'get one post';
  }

  getAllPosts(): string {
    return 'get all posts';
  }

  async createPost(): Promise<any> {
    await this.firestore.collection('posts').add({
      title: 'test',
    });
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
