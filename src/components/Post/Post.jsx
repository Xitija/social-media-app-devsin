import { useState } from "react";

import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

import "./Post.css";

export const Post = () => {
  const [newPost, setNewPost] = useState("");
  const { postDispatcher } = useData();
  const { loggedInUser } = useAuth();
  
  const addPostToDB = async (post) => {
    try {
      const passValue = JSON.stringify({ postData: { content: post } });

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: passValue,
      });

      const data = await response.json();

      // TODO: if

      postDispatcher({ type: "CREATE", payload: data.posts });
    } catch (e) {}
  };

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
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <div className="post-buttons">
          <button
            onClick={() => {
              addPostToDB(newPost);
              setNewPost("");
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
