import { NavLink } from "react-router-dom";

import { BiSolidHomeCircle, BiSolidBookmarks } from "react-icons/bi";
import { MdExplore } from "react-icons/md";
import "./Navigation.css";

export const Navigation = () => {
  const getActiveStyles = ({ isActive }) => ({
    color: isActive ? "#faba14" : "#fff",
  });

  return (
    <nav className="nav">
      <NavLink style={getActiveStyles} to="/">
        <div className="nav-link">
          <BiSolidHomeCircle className="nav-icon" />
          <div>Home</div>
        </div>
      </NavLink>
      <NavLink className="nav-link" style={getActiveStyles} to="/explore">
        <MdExplore className="nav-icon" />
        Explore
      </NavLink>
      <NavLink className="nav-link" style={getActiveStyles} to="/bookmarks">
        <BiSolidBookmarks className="nav-icon" />
        Bookmarks
      </NavLink>
    </nav>
  );
};
