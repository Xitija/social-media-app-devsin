import { useData } from "../../contexts/DataContext";
import { PostCard } from "../PostCard/PostCard";

import "./Explore.css"

export const Explore = () => {
  const { posts } = useData();

  return (
    <div className="explore-container">
      <h4>Explore</h4>
      <hr />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};
