import "./PostItem.css";

import { PostEntity } from "../../entities/PostEntity";
import { createElement } from "../../libs/renderer/utils/createElement";
import { deletePost } from "../../state/actions";

type PostItemProps = {
  post: PostEntity;
};

function PostItem(props: PostItemProps) {
  const { post } = props;

  return createElement("div", { className: "post-item", "data-key": post.id }, [
    createElement("p", { className: "post-title" }, [
      `[${post.id}] ${post.title}`,
    ]),
    createElement("p", { className: "post-body" }, [post.body]),
    createElement("button", { onclick: () => deletePost(post.id) }, [
      "Delete post",
    ]),
  ]);
}

export { PostItem };
