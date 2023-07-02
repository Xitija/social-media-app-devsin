import { useState } from "react";
import { usePosts } from "../../contexts/PostContext";

import { Post } from "../Post/Post";
import { PostCard } from "../PostCard/PostCard";

import "./HomePage.css";

export const HomePage = () => {
  const [showPosts, setShowPosts] = useState("Latest");
  const { getPosts } = usePosts();

  return (
    <div className="home-container">
      <h4>Home</h4>
      <hr />
      <div>
        <Post />
      </div>
      <hr />
      <div>
        <div className="feed-heading">
          <div
            className="feed-type"
            style={{ color: showPosts === "Latest" ? "#faba14" : "" }}
            onClick={() => setShowPosts("Latest")}
          >
            Latest
          </div>
          <div className="vl"></div>
          <div
            className="feed-type"
            style={{ color: showPosts === "Trending" ? "#faba14" : "" }}
            onClick={() => setShowPosts("Trending")}
          >
            Trending
          </div>
        </div>
        <hr />
        {getPosts(showPosts).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
