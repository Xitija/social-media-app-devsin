import { useState } from "react";
import Modal from "react-modal";

import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
// import { IoHeartDislikeOutline, IoHeartDislikeSharp } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";

import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

import "./PostCard.css";

export const PostCard = ({ post }) => {
  const { users, postDispatcher, bookmarks, setBookmarks } = useData();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [editPost, setEditPost] = useState({});
  const currentUserToken = localStorage.getItem("token");

  //TODO: can we move to context
  // USER PROFILE < FULL POST VIEW , sign in
  const { loggedInUser } = useAuth();
  const currentUser = users.find(
    ({ username }) => username === loggedInUser.username
  );

  const handleEdit = (post) => {
    console.log(post);
    setEditPost(post);
    setEditModal(true);
    setShowModal(false);
  };

  const handleEditPost = async () => {
    console.log(editPost);
    try {
      const passValue = JSON.stringify({
        postData: { content: editPost.content },
      });

      const response = await fetch(`/api/posts/edit/${editPost._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: passValue,
      });

      const data = await response.json();

      // if
      console.log(data);
      postDispatcher({ type: "CREATE", payload: data.posts });
      return data.posts;
    } catch (e) {}
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
      });

      const data = await response.json();

      console.log(data, "DEl");

      if (data.posts) {
        postDispatcher({ type: "DELETE", payload: data.posts });
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLikePost = async (postId, action) => {
    try {
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
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleBookmarkPost = async (postId, action) => {
    try {
      let response;

      if (action === "REMOVE_BOOKMARK") {
        response = await fetch(`/api/users/remove-bookmark/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: {},
        });
      } else if (action === "ADD_BOOKMARK") {
        response = await fetch(`/api/users/bookmark/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: {},
        });
      }

      const data = await response.json();
      console.log(data);
      if (data.bookmarks) {
        setBookmarks(data.bookmarks);
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const userHasLiked = () => {
    return post.likes.likedBy.find((user) => user._id === currentUser._id);
  };

  const userHasBookmarked = () => {
    return bookmarks.some((bookmark) => bookmark._id === post._id);
  };

  // console.log(userHasLiked(), "hasliked");

  const likedByUser = userHasLiked();

  const bookmarkedByUser = userHasBookmarked();

  return (
    <>
      <div className="post-card" style={{ border: "0.5px solid" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {post.name} @{post.handle} {post.createdAt}
          </div>
          <div>
            {post.username === currentUser.username ? (
              <CiMenuKebab
                onClick={() => {
                  console.log("clicked");
                  setShowModal(!showModal);
                }}
                style={{ backgroundColor: "red" }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {showModal && (
          <div className="card-menu">
            <div onClick={() => handleEdit(post)}>
              <AiFillEdit />
              Edit
            </div>
            <div onClick={() => handleDeletePost(post._id)}>
              <AiFillDelete />
              Delete
            </div>
          </div>
        )}
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

          <span>
            <BiCommentDetail />
            <p>{post.comments.length}</p>
          </span>
          <span
            onClick={() =>
              bookmarkedByUser
                ? handleBookmarkPost(post._id, "REMOVE_BOOKMARK")
                : handleBookmarkPost(post._id, "ADD_BOOKMARK")
            }
          >
            {bookmarkedByUser ? <BsBookmarkFill /> : <BsBookmark />}
          </span>
        </div>
      </div>
      <Modal isOpen={showEditModal} onRequestClose={() => setEditModal(false)}>
        <h2>Edit Post</h2>
        <input
          type="text"
          value={editPost.content}
          onInput={(e) =>
            setEditPost({
              ...editPost,
              content: e.target.value,
            })
          }
        ></input>
        <button onClick={() => setEditModal(false)}>Close</button>
        <button
          onClick={() => {
            setEditModal(false);
            handleEditPost();
          }}
          disabled={!editPost?.content?.trim()}
        >
          Save
        </button>
      </Modal>
    </>
  );
};

/* <span>
          <IoHeartDislikeOutline />
          <p>{post.likes.dislikedBy.length}</p>
        </span> */
