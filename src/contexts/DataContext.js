import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { initialPosts, postReducer } from "../reducer/PostReducer";
import { useAuth } from "./AuthContext";
export const Data = createContext();

export const DataProvider = ({ children }) => {
  const { loggedInUser } = useAuth();
  console.log("Data Provider render");
  const [posts, postDispatcher] = useReducer(postReducer, initialPosts);
  const [users, setUsers] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const getAllPosts = async () => {
    try {
      console.log("get all posts");
      const postsResponse = await fetch("/api/posts");
      if (postsResponse.status === 200) {
        const { posts } = await postsResponse.json();
        postDispatcher({
          type: "SET",
          payload: posts,
        });
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

  const getAllUsers = async () => {
    try {
      console.log("get all users");
      const usersResponse = await fetch("/api/users");
      if (usersResponse.status === 200) {
        const { users } = await usersResponse.json();
        console.log(users, "alluser");
        setUsers(users);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // const getData = async () => {
  //   const users = await fetch("/api/users/");
  //   // const user = await fetch("/api/users/1b83b274-defe-4361-b0c3-1cd19959df91");
  //   console.log(await users.json(), "users");
  // };

  const getAllBookmarks = async () => {
    try {
      console.log("get all bookmark");
      const bookmarksResponse = await fetch("/api/users/bookmark", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      if (bookmarksResponse.status === 200) {
        const { bookmarks } = await bookmarksResponse.json();
        console.log(bookmarks);
        setBookmarks(bookmarks);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllPosts();
    getAllBookmarks();
    console.log("Called useeffect");
    return () => console.log("Data Provider unmounted");
  }, []);

  console.log(posts);

  const value = {
    posts,
    getPosts,
    postDispatcher,
    users,
    bookmarks,
    setBookmarks,
  };

  return <Data.Provider value={value}>{children}</Data.Provider>;
};

export const useData = () => useContext(Data);
