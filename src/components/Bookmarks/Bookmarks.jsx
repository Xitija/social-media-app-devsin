import { useUsers } from "../../contexts/UserContext";
import { PostCard } from "../PostCard/PostCard";

import "./Bookmarks.css";

export const Bookmarks = () => {
  const { getUserBookmarks } = useUsers();

  const bookmarks = getUserBookmarks();

  return (
    <div className="bookmarks-container">
      <h4>Bookmarks</h4>
      <hr />
      {bookmarks.length > 0 ? (
        bookmarks.map((post) => (
          <PostCard key={post._id} post={post} /> // Bring data
        ))
      ) : (
        <div className="no-bookmarks">
          <p>No Bookmarks yet!</p>
        </div>
      )}
    </div>
  );
};
