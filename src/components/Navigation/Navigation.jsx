import { NavLink } from "react-router-dom";
export const Navigation = () => {
  const getActiveStyles = ({ isActive }) => ({
    padding: "1rem",
    color: isActive ? "red" : "orange",
  });

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        borderRight: "0.5px solid",
      }}
    >
      <NavLink style={getActiveStyles} to="/">
        Home
      </NavLink>
      <NavLink style={getActiveStyles} to="/explore">
        Explore
      </NavLink>
      <NavLink style={getActiveStyles} to="/bookmarks">
        Bookmarks
      </NavLink>
    </nav>
  );
};
