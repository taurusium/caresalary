import { Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Injectable()
export class PostsService {
  private readonly firestore: Firestore;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.getFirestore();
  }
  getOnePost(): string {
    return 'get one post';
  }

  getAllPosts(): void {
    // return 'get all posts';
    // await this.firestore.collection('posts').doc("post").
  }

  async createPost(createPostDTO: CreatePostDTO): Promise<any> {
    await this.firestore.collection('posts').add({
      ...createPostDTO,
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
