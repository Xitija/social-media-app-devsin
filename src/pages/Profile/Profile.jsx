import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../../components/PostCard/PostCard";
import { BsArrowLeft,  BsLink45Deg } from "react-icons/bs"; 
// BsFillCameraFill,
import { FiLogOut } from "react-icons/fi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useUsers } from "../../contexts/UserContext";
import "./Profile.css";

export function Profile() {
  const navigate = useNavigate();
  const { getMyPosts } = usePosts();
  const { logoutUser, loggedInUser } = useAuth();
  const { userProfile, getUser, users, handleFollowUser } = useUsers();
  const { user } = useParams();

  useEffect(() => {
    getUser(user);
  }, [user]);

  let currentUser = users.find(
    ({ username }) => username === loggedInUser?.username
  );

  if (!currentUser) {
    currentUser = loggedInUser;
  }

  // const editProfile = () => {};

  const userHasFollowed = () => {
    return currentUser.following.find(
      (user) => user?.username === userProfile?.username
    );
  };

  return (
    <div className="home-container">
      <div className="post-heading">
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <BsArrowLeft size={20} />
        </span>
        <h4>Profile</h4>
      </div>
      <hr />
      <div className="user-profile-detail">
        <div style={{ position: "relative" }}>
          <img
            className="user-profile-image"
            src={userProfile?.profileAvatar}
            alt={userProfile?.name}
          />
          {/* <div style={{}}><BsFillCameraFill /></div> */}
        </div>
        <div className="user-information">
          <h3>{userProfile?.name} </h3>
          <p>@{userProfile?.handle}</p>
          <p className="bio">{userProfile?.bio}</p>
          <a href={userProfile?.website}>
            <BsLink45Deg size={20} />
            {userProfile?.website}
          </a>
          <div className="follow">
            <span>{userProfile?.following.length ?? 0} <span className="follow-title">Following</span></span>
            <span>{userProfile?.followers.length ?? 0} <span className="follow-title">Followers</span></span>
          </div>
        </div>
        {userProfile?.username === currentUser?.username ? (
          <div className="user-profile-actions">
            {/* <button onClick={editProfile}>Edit Profile</button> */}
            <FiLogOut className="logout" onClick={logoutUser} />
          </div>
        ) : (
          <div className="user-profile-actions">
            {userHasFollowed() ? (
              <button
                className="follow-btn"
                onClick={() => handleFollowUser(userProfile._id, "UNFOLLOW")}
              >
                UnFollow
              </button>
            ) : (
              <button
                className="follow-btn"
                onClick={() => handleFollowUser(userProfile._id, "FOLLOW")}
              >
                Follow
              </button>
            )}
          </div>
        )}
      </div>
      <hr />
      <div>
        <hr />
        {getMyPosts(userProfile).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
