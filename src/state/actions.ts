import { PostService } from "../services/postService/PostService";
import { state } from ".";

const loadPosts = async () => {
  state.setState({ postsLoading: true });
  const posts = await PostService.getPostsList();
  state.setState({ posts, postsLoading: false });
};

const deletePost = (postId: number) => {
  const posts = state.getState().posts;
  state.setState({
    posts: posts.filter((p) => p.id !== postId),
  });
};

export { loadPosts, deletePost };
