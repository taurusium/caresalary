import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostsService);
    getAllPosts(): string;
    getOnePost(): string;
    createPost(): string;
    updatePost(): string;
    updatePartialPost(): string;
    deletePost(): string;
}
