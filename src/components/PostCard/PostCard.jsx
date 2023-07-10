import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";

import { useUsers } from "../../contexts/UserContext";
import { usePosts } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";

import "./PostCard.css";

export const PostCard = ({ post }) => {
  const { handleDeletePost, handleLikePost, handleEditPost } = usePosts();
  const { users, bookmarks, handleBookmarkPost } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [editPost, setEditPost] = useState({});

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
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <h2>Edit Post</h2>
      <div className="edit-post">
        <div>
          <img className="profile-avatar" src={currentUser?.profileAvatar} alt={currentUser?.name}/>
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
                handleEditPost(editPost);
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

  const handleEdit = (e, post) => {
    setEditPost(post);
    setEditModal(true);
    setShowModal(false);
    // e.stopPropagation();
  };

  const userHasLiked = () => {
    return post.likes.likedBy.find((user) => user?._id === currentUser?._id);
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
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${post.handle}`}
          >
            <img
              className="profile-avatar"
              src={post?.profileAvatar}
              alt={post.name}
            />
          </Link>
        </div>

        <div className="post-card">
          <div className="post-card-detail">
            <div>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/profile/${post.handle}`}
              >
                <span>{post.name}</span>
              </Link>
              <span className="other-details">
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/profile/${post.handle}`}
                >
                  <span>@{post.handle}</span>
                </Link>
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
              {post?.username === currentUser?.username ? (
                <CiMenuKebab
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowModal(!showModal);
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          {showModal && (
            <div
              className="card-menu"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div
                onClick={(e) => {
                  handleEdit(e, post);
                }}
              >
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
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/post-details/${post._id}`}
          >
            <p className="post-content">{post.content}</p>
          </Link>
          <div
            className="post-actions"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
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
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {popupContent}
      </Modal>
    </>
  );
};
