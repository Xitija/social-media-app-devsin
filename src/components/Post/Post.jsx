import { useState } from "react";

import { usePosts } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";

import "./Post.css";

export const Post = () => {
  const [newPost, setNewPost] = useState("");
  const { addPostToDB } = usePosts();
  const { loggedInUser } = useAuth();

  return (
    <div className="create-post-card">
      <div>
        <img
          className="profile-avatar"
          src={loggedInUser.profileAvatar}
          alt={loggedInUser.name}
        />
      </div>
      <div className="post-content">
        <textarea
          placeholder="What's happening? "
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <div className="post-buttons">
          <button
            onClick={() => {
              addPostToDB(newPost);
              setNewPost("");
            }}
            disabled={!newPost.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
