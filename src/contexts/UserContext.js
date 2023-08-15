import { useContext, createContext, useEffect, useState } from "react";

import { usePosts } from "./PostContext";
import { useAuth } from "./AuthContext";

export const Users = createContext();

export const UsersProvider = ({ children }) => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { posts, getMyPosts, handleEditPostImage } = usePosts();
  const [users, setUsers] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [searchUser, setSearchUser] = useState("");

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

  const getUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);

      const data = await response.json();

      if (data.user) {
        setUserProfile(data.user);
      } else if (!data.user) {
        setUserProfile(loggedInUser);
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // const getSuggestedUsersOld = () => {
  //   console.log(loggedInUser?.following, "log");
  //   return users.filter((user) =>
  //     loggedInUser?.following.find(
  //       (currentUser) =>
  //         currentUser._id !== user._id
  //     )
  //   );
  // };

  // TODO:
  const getSuggestedUsers = () =>
    users
      ?.filter((dbUser) => dbUser.username !== loggedInUser?.username)
      ?.filter(
        (eachUser) =>
          !loggedInUser?.following?.find(
            (item) => item.username === eachUser.username
          )
      );

  const searchedUsers = () => {
    return users.filter(
      ({ name, handle }) =>
        searchUser.length &&
        (name.toLowerCase().includes(searchUser.toLowerCase()) ||
          handle.toLowerCase().includes(searchUser.toLowerCase()))
    );
  };

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

  const handleFollowUser = async (userId, action, fromSuggested) => {
    const currentUserToken = localStorage.getItem("token");
    try {
      let response;

      if (action === "FOLLOW") {
        response = await fetch(`/api/users/follow/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: currentUserToken,
          },
          body: {},
        });
      } else if (action === "UNFOLLOW") {
        response = await fetch(`/api/users/unfollow/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: currentUserToken,
          },
          body: {},
        });
      }

      const data = await response.json();

      if (data.user) {
        setLoggedInUser(data.user);
        if (fromSuggested === "suggested") {
          setUserProfile(data.user);
        }
        setUpdatedUser(data.user);
        setUpdatedUser(data.followUser);
      } else {
        console.error(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setUpdatedUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? { ...updatedUser } : user
      )
    );
  };

  const updateUserPosts = (profileAvatar) => {
    const userPosts = getMyPosts(loggedInUser);
    userPosts.map(
      async (post) => await handleEditPostImage(post, profileAvatar)
    );
  };

  const editUser = async (userData) => {
    // console.log(userDetails);
    try {
      const userResponse = await fetch("/api/users/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ userData: userData }),
      });
      if (userResponse.status === 201) {
        const eu = await userResponse.json();
        console.log(eu.user);
        setLoggedInUser(eu.user);
        setUserProfile(eu.user);
        updateUserPosts(eu.user.profileAvatar);
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
    getUser,
    userProfile,
    getSuggestedUsers,
    searchUser,
    setSearchUser,
    searchedUsers,
    handleFollowUser,
    editUser,
  };

  return <Users.Provider value={value}>{children}</Users.Provider>;
};

export const useUsers = () => useContext(Users);
