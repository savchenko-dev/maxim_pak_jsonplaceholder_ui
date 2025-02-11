import { AuthorEntity } from "../entities/AuthorEntity";
import { CommentEntity } from "../entities/CommentEntity";
import { PostEntity } from "../entities/PostEntity";
import { Store } from "../libs/store/Store";

export type FullPost = PostEntity & {
  author: AuthorEntity;
  comments: CommentEntity[];
};
interface IState {
  posts: FullPost[];
  searchQuery: string;
  postsLoading: boolean;
  limit: number;
  currentPage: number;
}

const state = new Store<IState>({
  posts: [],
  postsLoading: false,
  searchQuery: "",
  limit: 10,
  currentPage: 1,
});

export { state };
