import { NavLink } from "react-router-dom";
import { RiUser3Fill } from "react-icons/ri";

import "../Header/Header.css";
import logo from "../../assets/logo.png";

export const Header = () => {
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
        <div>
          <NavLink to="/login" className="nav-link">
            <button>Log In</button>
          </NavLink>
        </div>
        <div>
          <NavLink to="/signup" className="nav-link">
            <button>Sign Up</button>
          </NavLink>
        </div>
        <NavLink to="/profile" className="nav-link">
          <RiUser3Fill color="#faba14" size={25} strokeWidth="1.2" />
        </NavLink>
      </div>
    </nav>
  );
};
