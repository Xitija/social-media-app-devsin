import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";
import { BsArrowLeft } from "react-icons/bs";

import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

import { BiCommentDetail } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";

import "./PostDetail.css";
import { usePosts } from "../../contexts/PostContext";
import { useUsers } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { Comment } from "../Comment/Comment";

export function PostDetail() {
  const { postid } = useParams();
  const { loggedInUser } = useAuth();
  const {
    singlePost,
    setSinglePost,
    getPost,
    handleDeletePost,
    handleLikePost,
    handleEditPost,
  } = usePosts();
  const { users, bookmarks, handleBookmarkPost } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [editPost, setEditPost] = useState({});
  const navigate = useNavigate();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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
                handleEditPost(editPost,"SINGLE_POST");
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

  const userHasLiked = () => {
    return singlePost?.likes?.likedBy.find((user) => {
      return user._id === currentUser._id;
    });
  };

  const handleEdit = (e, post) => {
    setEditPost(post);
    setEditModal(true);
    setShowModal(false);
    // e.stopPropagation();
  };

  const userHasBookmarked = () => {
    return bookmarks.some((bookmark) => bookmark === singlePost._id);
  };

  const likedByUser = userHasLiked();

  const bookmarkedByUser = userHasBookmarked();

  useEffect(() => {
    getPost(postid);
  }, []);

  return (
    <>
      <div className="post-detail-container">
        <div className="post-heading">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSinglePost({});
              navigate(-1);
            }}
          >
            <BsArrowLeft size={20} />
          </span>
          <h4>Post</h4>
        </div>
        <hr />
        <div>
          <div className="post-container">
            <div className="post-user-container">
              <div>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/profile/${singlePost?.handle}`}
                >
                  <img
                    className="profile-avatar"
                    src={singlePost?.profileAvatar}
                    alt={singlePost?.name}
                  />
                </Link>
              </div>
              <div>
                {/* post area */}
                <div className="single-post">
                  <div className="single-post-detail">
                    <div>
                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/profile/${singlePost?.handle}`}
                      >
                        <span>{singlePost?.name}</span>
                      </Link>
                      <span className="post-date">
                        {new Date(singlePost?.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </span>
                    </div>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/profile/${singlePost?.handle}`}
                    >
                      <span className="user-handle">@{singlePost?.handle}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div className="single-post-content-container">
              <div className="single-post-content">{singlePost?.content}</div>
              <div style={{ padding: "0.5rem 0.2rem" }}>
                {singlePost.username === currentUser.username && (
                  <CiMenuKebab
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowModal(!showModal);
                    }}
                  />
                )}
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
                      handleEdit(e, singlePost);
                    }}
                  >
                    <AiFillEdit />
                    Edit
                  </div>
                  <div
                    style={{ color: "red" }}
                    onClick={() => {
                      handleDeletePost(singlePost._id);
                      navigate("/");
                    }}
                  >
                    <AiFillDelete />
                    Delete
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
          <div
            className="single-post-actions"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              className="action"
              onClick={() =>
                likedByUser
                  ? handleLikePost(singlePost._id, "DISLIKE","SINGLE_POST")
                  : handleLikePost(singlePost._id, "LIKE","SINGLE_POST")
              }
            >
              <span className="icon like">
                {likedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
              </span>
              <span>
                {singlePost?.likes?.likeCount ? singlePost.likes.likeCount : ""}
              </span>
            </div>
            <div className="action">
              <span className="icon comment">
                <BiCommentDetail />
              </span>
              <span>
                {singlePost?.comments?.length ? singlePost.comments.length : ""}
              </span>
            </div>
            <span
              className="bookmark"
              style={{ cursor: "pointer" }}
              onClick={() =>
                bookmarkedByUser
                  ? handleBookmarkPost(singlePost._id, "REMOVE_BOOKMARK")
                  : handleBookmarkPost(singlePost._id, "ADD_BOOKMARK")
              }
            >
              {bookmarkedByUser ? <BsBookmarkFill /> : <BsBookmark />}
            </span>
          </div>
          <hr />
          <div>
            {singlePost?.comments?.map((comment) => (
              <Comment comment={comment} />
            ))}
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
}
