import { PostEntity } from "../../entities/PostEntity";
import { PostItem } from "../PostItem/PostItem";
import { createElement } from "../../libs/renderer/utils/createElement";
import { state } from "../../state";

interface PostListProps {
  postItems: PostEntity[];
  loading: boolean;
}

function PostList(props: PostListProps) {
  const { postItems, loading } = props;

  return createElement("div", undefined, [
    createElement("input", {
      type: "text",
      oninput: (e: any) => state.setState({ searchQuery: e.target.value }),
    }),
    createElement(
      "div",
      undefined,
      loading ? ["Loading..."] : postItems.map((post) => PostItem({ post }))
    ),
  ]);
}

export { PostList };
