import { NavLink } from "react-router-dom";

import "../Header/Header.css";
import logo from "../../assets/logo.png";

import { useAuth } from "../../contexts/AuthContext";

export const Header = () => {
  const { loggedInUser } = useAuth();

  return (
    <nav className="nav-bar">
      <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          className="logo"
          style={{ width: "12%", backgroundColor: "black" }}
          src={logo}
          alt="DevsIn_logo"
        />
        <p className="logo-title">DevsIn</p>
      </NavLink>

      <div className="navigation">
        {loggedInUser.handle && <NavLink to={`/profile/${loggedInUser.handle}`}>
          <img className="current-profile-avatar"
            src={loggedInUser.profileAvatar ? loggedInUser.profileAvatar : ""}
            alt="profile-avatar"
          />
        </NavLink>}
      </div>
    </nav>
  );
};
