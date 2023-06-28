import { useState } from "react";
import { useData } from "../../contexts/DataContext";

import { Post } from "../Post/Post";
import { PostCard } from "../PostCard/PostCard";

export const HomePage = () => {
  const [showPosts, setShowPosts] = useState("Latest");
  const { getPosts } = useData();
  
  return (
    <div>
      <div>
        <Post />
      </div>
      <div>
        <button onClick={() => setShowPosts("Latest")}>Latest</button>
        <button onClick={() => setShowPosts("Trending")}>Trending</button>
        <p>{showPosts}</p>
        {getPosts(showPosts).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
