import { useContext, createContext, useEffect, useState } from "react";

import { usePosts } from "./PostContext";

export const Users = createContext();

export const UsersProvider = ({ children }) => {
  const { posts } = usePosts();
  const [users, setUsers] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [userProfile, setUserProfile] = useState();

  const getAllUsers = async () => {
    try {
      const usersResponse = await fetch("/api/users");
      if (usersResponse.status === 200) {
        const { users } = await usersResponse.json();
        setUsers(users);
      }
    } catch (e) {
      console.error(e);
    }
  };

  //   const getUser = async (userId) => {
  //     try {
  //       const response = await fetch(`/api/users/${userId}`);

  //       const data = await response.json();

  //       if (data) {
  //         console.log(data);
  //         setUserProfile(data.user)
  //       } else {
  //         console.error(data);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  // const getData = async () => {
  //   const users = await fetch("/api/users/");
  //   // const user = await fetch("/api/users/1b83b274-defe-4361-b0c3-1cd19959df91");
  //   console.log(await users.json(), "users");
  // };

  const getAllBookmarks = async () => {
    try {
      const bookmarksResponse = await fetch("/api/users/bookmark", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      if (bookmarksResponse.status === 200) {
        const { bookmarks } = await bookmarksResponse.json();
        setBookmarks(bookmarks);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUserBookmarks = () => {
    return bookmarks.map((bookmarkId) =>
      posts.find(({ _id }) => _id === bookmarkId)
    );
  };

  const handleBookmarkPost = async (postId, action) => {
    try {
      let response;

      if (action === "REMOVE_BOOKMARK") {
        response = await fetch(`/api/users/remove-bookmark/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: {},
        });
      } else if (action === "ADD_BOOKMARK") {
        response = await fetch(`/api/users/bookmark/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: {},
        });
      }

      const data = await response.json();

      if (data.bookmarks) {
        setBookmarks(data.bookmarks);
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllBookmarks();
  }, []);

  const value = {
    users,
    setUsers,
    bookmarks,
    getUserBookmarks,
    handleBookmarkPost,
    // getUser
  };

  return <Users.Provider value={value}>{children}</Users.Provider>;
};

export const useUsers = () => useContext(Users);
