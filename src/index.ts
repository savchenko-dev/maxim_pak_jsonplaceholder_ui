import "./style.css";

import { PostList } from "./components/PostList/PostList";
import { Renderer } from "./libs/renderer/Renderer";
import { loadPosts } from "./state/actions";
import { state } from "./state";

// Render
const dom = new Renderer();

function render() {
  const { searchQuery, posts, postsLoading } = state.getState();

  const filteredPosts = posts.filter(
    (p) =>
      !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(PostList({ loading: postsLoading, postItems: filteredPosts }));

  dom.render(
    PostList({ loading: postsLoading, postItems: filteredPosts }),
    document.getElementById("app")
  );
}

state.subscribe(render);

// Load data
loadPosts();
