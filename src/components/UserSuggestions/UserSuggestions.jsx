import { useUsers } from "../../contexts/UserContext";

import { Link } from "react-router-dom";
import "./UserSuggestions.css";

export const UserSuggestions = () => {
  // const 
  const {
    getSuggestedUsers,
    searchUser,
    setSearchUser,
    searchedUsers,
    handleFollowUser,
  } = useUsers();

  const searchedUser = searchedUsers();

  return (
    <div className="user-suggestions">
      {/* <div> */}
      <div style={{ padding: "1rem", position: "relative" }}>
        <input
          value={searchUser}
          className="search"
          id="search"
          type="text"
          placeholder="Search Developers"
          onChange={(e) => setSearchUser(e.target.value)}
        ></input>
        {searchedUser.length > 0 && (
          <div className="search-content">
            <div style={{ padding: "1rem" }}>
              {searchedUser.map(({ _id, name, profileAvatar, handle }) => (
                <Link key={_id} className="searches" to={`/profile/${handle}`}>
                  <div className="user-detail">
                    <div>
                      <img
                        className="profile-avatar"
                        src={profileAvatar}
                        alt={name}
                      />
                    </div>
                    <div>{name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "0rem 1rem 1rem" }}>
        <div className="users">
          <div className="title">Suggestions For You</div>
          {getSuggestedUsers().map(({ _id, name, profileAvatar, handle }) => (
            <Link
              key={_id}
              className="suggestion-section"
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${handle}`}
            >
              <div className="user-detail">
                <div>
                  <img
                    className="profile-avatar"
                    src={profileAvatar}
                    alt={name}
                  />
                </div>
                <div>{name}</div>
              </div>
              <div>
                <button
                  className="btn-follow"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFollowUser(_id, "FOLLOW");
                  }}
                >
                  Follow
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    // </div>
  );
};
