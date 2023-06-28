import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { IoHeartDislikeOutline, IoHeartDislikeSharp } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";

import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

export const PostCard = ({ post }) => {
  const { users, postDispatcher } = useData();

  //TODO: can we move to context
  const { loggedInUser } = useAuth();
  const currentUser = users.find(
    ({ username }) => username === loggedInUser.username
  );

  const handleLikePost = async (postId, action) => {
    try {
      console.log(postId, "postId");

      let response;

      if (action === "DISLIKE") {
        response = await fetch(`/api/posts/dislike/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: {},
        });
      } else if (action === "LIKE") {
        response = await fetch(`/api/posts/like/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: {},
        });
      }

      const data = await response.json();

      if (data.posts) {
        postDispatcher({ type: "LIKE", payload: data.posts });
      }

      console.log(response, "pres");
    } catch (e) {}
  };

  const userHasLiked = () => {
    return post.likes.likedBy.find((user) => {
      console.log(user._id, currentUser._id);
      if (user._id === currentUser._id) {
        return user;
      }
    });
  };

  // console.log(userHasLiked(), "hasliked");

  const likedByUser = userHasLiked();

  return (
    <div style={{ border: "0.5px solid" }}>
      <p>
        {post.name} @{post.handle} {post.createdAt}
        <CiMenuKebab />
      </p>
      <p>{post.content}</p>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0.5rem",
          alignItems: "center",
        }}
      >
        <span
          onClick={() =>
            likedByUser
              ? handleLikePost(post._id, "DISLIKE")
              : handleLikePost(post._id, "LIKE")
          }
        >
          {likedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
          <p>{post.likes.likeCount}</p>
        </span>
        {/* <span>
          <IoHeartDislikeOutline />
          <p>{post.likes.dislikedBy.length}</p>
        </span> */}
        <span>
          <BiCommentDetail />
          <p>{post.comments.length}</p>
        </span>
        <BsBookmark />
      </div>
    </div>
  );
};
