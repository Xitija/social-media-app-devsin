import { useContext, createContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";
export const Posts = createContext();

export const PostsProvider = ({ children }) => {
  const { loggedInUser } = useAuth();
  const currentUserToken = localStorage.getItem("token");

  // console.log("Data Provider render");
  // const [posts, postDispatcher] = useReducer(postReducer, initialPosts);
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({});

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

  const getMyPosts = (currentUser) => {
    return posts?.filter(
      (currentPost) => currentPost?.username === currentUser?.username
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

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
      });

      const data = await response.json();

      if (data.posts) {
        // postDispatcher({ type: "DELETE", payload: data.posts });
        setPosts(data.posts);
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLikePost = async (postId, action, forPage) => {
    try {
      let response;

      if (action === "DISLIKE") {
        response = await fetch(`/api/posts/dislike/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: currentUserToken,
          },
          body: {},
        });
      } else if (action === "LIKE") {
        response = await fetch(`/api/posts/like/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: currentUserToken,
          },
          body: {},
        });
      }

      const data = await response.json();

      if (data.post) {
        // postDispatcher({ type: "LIKE", payload: data.posts });
        // setPosts(data.post);

        if (forPage === "SINGLE_POST") {
          setSinglePost(data.post);
        }

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...data.post } : post
          )
        );
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditPost = async (editPost, forPage) => {
    try {
      const passValue = JSON.stringify({
        postData: { content: editPost.content },
      });

      const response = await fetch(`/api/posts/edit/${editPost._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: passValue,
      });

      const data = await response.json();

      // TODO:if
      // postDispatcher({ type: "CREATE", payload: data.posts });
      setPosts(data.posts);

      if (forPage === "SINGLE_POST") {
        setSinglePost(data.posts.find(({ _id }) => _id === editPost._id));
      }

      return data.posts;
    } catch (e) {}
  };

  const handleEditPostImage = async (editPost, profileAvatar) => {
    try {
      const passValue = JSON.stringify({
        postData: { profileAvatar: profileAvatar },
      });

      const response = await fetch(`/api/posts/edit/${editPost._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: passValue,
      });

      const data = await response.json();

      // TODO:if
      // postDispatcher({ type: "CREATE", payload: data.posts });
      setPosts(data.posts);

      return data.posts;
    } catch (e) {}
  };

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

      // postDispatcher({ type: "CREATE", payload: data.posts });
      setPosts(data.posts);
    } catch (e) {}
  };

  const getPost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: currentUserToken,
        },
      });

      const data = await response.json();

      if (data) {
        setSinglePost(data.post);
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllPosts();
    // return () => console.log("Data Provider unmounted");
  }, []);

  const value = {
    posts,
    singlePost,
    setSinglePost,
    getPost,
    getPosts,
    getMyPosts,
    setPosts,
    addPostToDB,
    handleDeletePost,
    handleLikePost,
    handleEditPost,
    handleEditPostImage
  };

  return <Posts.Provider value={value}>{children}</Posts.Provider>;
};

export const usePosts = () => useContext(Posts);
