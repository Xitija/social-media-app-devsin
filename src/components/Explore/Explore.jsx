import { useData } from "../../contexts/DataContext";

export const Explore = () => {
  const { posts } = useData();

  return (
    <div>
      <p>Explore</p>
      {posts.map((post) => (
        <div style={{ border: "0.5px solid" }}>
          <p>
            {post.name} @{post.handle} {post.createdAt}
          </p>
          <p>{post.content}</p>
          <p>{post.likes.likeCount}</p>
        </div>
      ))}
    </div>
  );
};
