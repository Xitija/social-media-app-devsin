import { useContext, createContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";
export const Data = createContext();

export const DataProvider = ({ children }) => {
  const { loggedInUser } = useAuth();
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const postsResponse = await fetch("/api/posts");
      if (postsResponse.status === 200) {
        const { posts } = await postsResponse.json();
        setPosts(posts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getPostsforUser = () => {
    return posts?.filter(
      (currentPost) =>
        loggedInUser.following.find(
          (currentUser) => currentUser.username === currentPost.username
        ) || loggedInUser.username === currentPost.username
    );
  };

  const getPosts = (showPosts) => {
    if (showPosts === "Latest") {
      return getPostsforUser().sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (showPosts === "Trending") {
      return getPostsforUser().sort(
        (a, b) => b.likes.likeCount - a.likes.likeCount
      );
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return <Data.Provider value={{ posts, getPosts }}>{children}</Data.Provider>;
};

export const useData = () => useContext(Data);
