import { useData } from "../../contexts/DataContext";
import { PostCard } from "../PostCard/PostCard";

export const Explore = () => {
  const { posts } = useData();

  return (
    <div>
      <p>Explore</p>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};
