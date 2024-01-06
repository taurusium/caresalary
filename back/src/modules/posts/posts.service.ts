import { FieldValue, Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

//TODO Promise<any>수정
@Injectable()
export class PostsService {
  private readonly firestore: Firestore;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.getFirestore();
  }

  async getOnePost(postId: string): Promise<any> {
    const snapshot = await this.firestore.collection('posts').doc(postId).get();
    const post = snapshot.data();
    return post;
  }

  async getAllPosts(): Promise<any> {
    const snapshot = await this.firestore.collection('posts').get();
    const allPosts = snapshot.docs.map((doc) => doc.data());
    return allPosts;
  }

  async createPost(createPostDto: CreatePostDto): Promise<any> {
    await this.firestore.collection('posts').add({
      ...createPostDto,
      createAt: FieldValue.serverTimestamp(),
      updateAt: FieldValue.serverTimestamp(),
    });
  }

  async updatePost(postId: string, updatePostDto: CreatePostDto): Promise<any> {
    await this.firestore
      .collection('posts')
      .doc(postId)
      .update({
        ...updatePostDto,
        updatedAt: FieldValue.serverTimestamp(),
      });
  }

  async updatePartialPost(
    postId: string,
    updatePostDto: CreatePostDto,
  ): Promise<any> {
    await this.firestore
      .collection('posts')
      .doc(postId)
      .update({
        ...updatePostDto,
        updatedAt: FieldValue.serverTimestamp(),
      });
  }

  async deletePost(postId: string): Promise<any> {
    await this.firestore.collection('posts').doc(postId).delete();
  }

  async getPostByUserId() {}
}
