import { useState } from "react";
import Modal from "react-modal";

import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { BsBookmarkFill, BsBookmark, BsDot } from "react-icons/bs";
// import { IoHeartDislikeOutline, IoHeartDislikeSharp } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { PiDotBold } from "react-icons/pi";

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

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { loggedInUser } = useAuth();
  const currentUser = users.find(
    ({ username }) => username === loggedInUser.username
  );

  const popupContent = (
    <div>
      <h2>Edit Post</h2>
      <div className="edit-post">
        <div>
          <img className="profile-avatar" src={currentUser.profileAvatar} />
        </div>
        <div className="content">
          <textarea
            type="text"
            value={editPost.content}
            onInput={(e) =>
              setEditPost({
                ...editPost,
                content: e.target.value,
              })
            }
          ></textarea>
          <div className="button-container">
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
          </div>
        </div>
      </div>
    </div>
  );

  const handleEdit = (post) => {
    setEditPost(post);
    setEditModal(true);
    setShowModal(false);
  };

  const handleEditPost = async () => {
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

      // TODO:if
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
    return bookmarks.some((bookmark) => bookmark === post._id);
  };

  const likedByUser = userHasLiked();

  const bookmarkedByUser = userHasBookmarked();

  return (
    <>
      <div className="post-card-container">
        <div>
          <img
            className="profile-avatar"
            src={post.profileAvatar}
            alt={post.name}
          />
        </div>
        <div className="post-card">
          <div className="post-card-detail">
            <div>
              <span>{post.name}</span>
              <span className="other-details">
                <span>@{post.handle}</span>
                <span>-</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </span>
              </span>
            </div>
            <div>
              {post.username === currentUser.username ? (
                <CiMenuKebab
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
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
              <div
                style={{ color: "red" }}
                onClick={() => handleDeletePost(post._id)}
              >
                <AiFillDelete />
                Delete
              </div>
            </div>
          )}
          <p className="post-content">{post.content}</p>
          <div className="post-actions">
            <div
              className="action"
              onClick={() =>
                likedByUser
                  ? handleLikePost(post._id, "DISLIKE")
                  : handleLikePost(post._id, "LIKE")
              }
            >
              <span className="icon like">
                {likedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
              </span>
              <span>{post.likes.likeCount ? post.likes.likeCount : ""}</span>
            </div>
            <div className="action">
              <span className="icon comment">
                <BiCommentDetail />
              </span>
              <span>{post.comments.length ? post.comments.length : ""}</span>
            </div>
            <span
              className="bookmark"
              style={{ cursor: "pointer" }}
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
      </div>
      <Modal
        className="pop-up-container"
        isOpen={showEditModal}
        onRequestClose={() => setEditModal(false)}
      >
        {popupContent}
      </Modal>
    </>
  );
};

/* <span>
          <IoHeartDislikeOutline />
          <p>{post.likes.dislikedBy.length}</p>
        </span> */
